import fs from 'fs/promises';
import path from 'path';

import sharp from 'sharp';
import lunr from 'lunr';
import editJsonFile from 'edit-json-file';
import cliProgress from 'cli-progress';
import I3 from "@digital-piranesi/iiif-manifest-library";
import csvParser from 'csv-parser';

import { createReadStream, readdirSync, existsSync } from 'fs';
import serieConfig from './data/serie.config.js';

let clearDerivativesFolder = false;
if (process.argv.indexOf('-c') > -1) {
  clearDerivativesFolder = true;
}

let createDerivatives = false;
if (process.argv.indexOf('-d') > -1) {
  createDerivatives = true;
}

const localBase = `http://localhost:${serieConfig.localPort}`;

const configFile = "serie.config.js";
const metadataFile = "metadata.csv";
const imagesFolder = "raw_images/";

const dataPath = "./data/";
const srcConfigPath = "./src/config/";
const derivativesPath = "./static/iiif/";

const metadataPath = "./src/routes/data/metadata.js";
const indexPath = "./src/routes/data/searchIndex.js";

main();

async function main() {
  // Delete the IIIF derivatives folder
  if (clearDerivativesFolder) {
    await deleteCopiedData();
  }

  // Copy the config file to use its data in svelte
  await copyData();

  if (createDerivatives) {
    // Create the Collection: IIIF derivatives and adjunct metadata
    await createCollection();
  }
}

async function deleteCopiedData() {
  if (existsSync(derivativesPath)) {
    await fs.rm(derivativesPath, { recursive: true, force: true }, () => {});
  }
  processMsg("TASK: deleted previous files");
}

async function parseMetadata() {
  const metadata = [];
  await new Promise(r => {
    createReadStream(dataPath + metadataFile)
      .pipe(csvParser())
      .on('data', data => metadata.push(data))
      .on('end', () => r(metadata))
  });

  // VALIDATION
  // Incorrect pid or label
  if (metadata[0].pid === undefined || metadata[0].label === undefined) {
    errorMsg("metadata", "Los metadatos no tienen 'pid' o 'label' (en minúsculas) / Metadata doesn't have 'pid' or 'label' (in lowercase)");
    process.exit(1);
  } 

  // Empty metadata
  if (metadata.length <= 0) {
    errorMsg("metadata", "Los metadatos están vacíos / Metadata is empty");
    process.exit(1);
  }

  // Unique pids
  if ([...new Set(metadata.map(d => d.pid))].length !== metadata.length) {
    errorMsg("metadata", "Hay pids que no son únicos / There are non unique pids");
    process.exit(1);
  }

  // Has pids and labels
  for (let e of metadata) {
    if (e.pid === undefined || e.label === undefined) {
      errorMsg("metadata", "Hay filas sin pids o labels / There are rows without pids or labels");
      process.exit(1);
    }
  }  

  return metadata
}

async function createCollection() {
  let metadata = await parseMetadata();
  await createSearchIndex(metadata);

  if (serieConfig.pages.iiifViewer) {
    metadata = await batchProcessImages(metadata);
  }
  
  await createMetadataJS(metadata);
  processMsg("TASK: created collection elements");
}

async function createSearchIndex(metadata) {
  const searchIndex = lunr(function () {
    this.ref("pid");
    const keysToIndex = serieConfig.pages.metadataToIndex.length <= 0 ? Object.keys(metadata[0]) : serieConfig.pages.metadataToIndex;
    for (let k of keysToIndex) { this.field(k) }
    for (let d of metadata) { this.add(d) }
  })

  await fs.writeFile(indexPath, `export const searchIndex = ${JSON.stringify(searchIndex)};`);
}

async function createMetadataJS(metadata) {
  await fs.writeFile(metadataPath, `export const projectMetadata = ${JSON.stringify(metadata)};`);
}

async function batchProcessImages(metadata) {
  await mkDir(derivativesPath);

  // GET VALID FILENAMES OF IMAGES
  const imagesFilenames = readdirSync(dataPath + imagesFolder);
  const validFilenames = {single: [], folder: []};
  for (let f of imagesFilenames) {
    const filePath = `${dataPath}${imagesFolder}${f}`;
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const subdirFilenames = readdirSync(filePath);
      const validSubfiles = [];
      for (let sf of subdirFilenames) {
        const subFilePath = `${filePath}/${sf}`;
        if ((await fs.stat(subFilePath)).isFile() && isValidExtension(subFilePath)) {
          validSubfiles.push(`${f}/${sf}`);
        }
      }
      if (validSubfiles.length > 0) {
        validFilenames.folder.push({filename: f, validSubfiles});
      }
    } else if (stat.isFile() && isValidExtension(filePath)) {
      validFilenames.single.push(f)
    }
  }

  function isValidExtension(filepath) {
    const validExtensions = [".png", ".jpg", ".tiff", ".gif"];
    const extension = path.extname(filepath).toLowerCase();
    return validExtensions.includes(extension);
  }

  function getFilenames(validFilenames, pid) {
    const regex = new RegExp(`^${pid}`);
    const file = validFilenames.single.find(d => regex.test(d));
    if (file) return [file]
    const folder = validFilenames.folder.find(d => regex.test(d.filename));
    if (folder) return folder.validSubfiles;
    return undefined
  }

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  processMsg("Processing images...");
  let i = 0;
  progressBar.start(metadata.length, i);

  const notFound = [];

  const derivativesFolderFilenames = readdirSync(derivativesPath);

  for (let e of metadata) {
    progressBar.update(i + 1);

    // Ya existe una carpeta de derivatives
    if (derivativesFolderFilenames.includes(e.pid)) {
      const manifest = editJsonFile(`${derivativesPath}/${e.pid}/manifest/manifest.json`);
      e._images = manifest.get("items").length;
      const { manifestUrl, manifestUrlDev } = getManifestUrls(e.pid);
      e.manifest = manifestUrl;
      e._manifest = manifestUrlDev;
      continue
    }

    // No existen imágenes para crear derivatives
    let filenames = getFilenames(validFilenames, e.pid);
    if (filenames === undefined) {
      errorMsg('image',`No image file for ${e.pid}`);
      notFound.push(e.pid);
      e._images = 0;
      const { manifestUrl, manifestUrlDev } = await createManifests(e.pid, e.label, []);
      e.manifest = manifestUrl;
      e._manifest = manifestUrlDev;
      continue
    }

    // Crear nuevas derivatives
    let sizes = [];
    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      await createIIIFDerivatives(`${dataPath}${imagesFolder}${filename}`, `${derivativesPath}${e.pid}/${i}`, e.pid);
      const size = (await createIIIFSizes(`${dataPath}${imagesFolder}${filename}`, `${derivativesPath}${e.pid}/${i}`))[0];
      sizes.push(size);
    }

    // Solo se crea un manifest aunque haya varias imágenes
    const { manifestUrl, manifestUrlDev } = await createManifests(e.pid, e.label, sizes);

    e.manifest = manifestUrl;
    e._manifest = manifestUrlDev;
    e._images = filenames.length;

    i++;
  }

  progressBar.stop();

  return metadata //.filter(d => !notFound.includes(d.pid) )
}

function getManifestUrls(pid) {
  const folderBase = `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}/manifest`;
  const manifestPath = `${folderBase}/manifest.json`;
  const manifestPathDev = `${localBase}${serieConfig.baseurl}/iiif/${pid}/manifest/manifest.json`;
  return { manifestUrl: manifestPath, manifestUrlDev: manifestPathDev}
}

async function createManifests(pid, label, sizes) {
  await mkDir(`${derivativesPath}${pid}/manifest/`);

  const folderBase = `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}/manifest`;
  // const folderBase = `${localBase}${serieConfig.baseurl}/iiif/${pid}/manifest`; // PARA TESTS
  const manifestPath = `${folderBase}/manifest.json`;
  const staticBase = `${derivativesPath}${pid}/manifest`;
  const manifestPathDev = `${localBase}${serieConfig.baseurl}/iiif/${pid}/manifest/manifest.json`;

  const manifest = new I3.default.Manifest("3", manifestPath);
  manifest.addLabel(new I3.default.Label("en", [label]));

  for (let i = 0; i < sizes.length; i++) {
    const {width, height} = sizes[i];
    const canvas = new I3.default.ItemCanvas(`${folderBase}/canvas-${i}.json`, width, height);
    const page = new I3.default.ItemWebAnnotationPage(`${folderBase}/page-${i}.json`);
    const image = new I3.default.ItemWebAnnotationImage(`${folderBase}/image-${i}.json`, "painting", canvas, `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}/${i}/full/max/0/default.jpg`, width, height);

    page.addItem(image); 
    canvas.addItem(page);
    manifest.addItem(canvas);
  }

  // const JSONstring =  manifest.toJSONString(); // Esta es la función original, pero daña la barra de progreso porque imprime algo en la consola
  const JSONstring =  toJSONString(manifest);

  const manifestFile = `${derivativesPath}${pid}/manifest/manifest.json`;
  await fs.writeFile(manifestFile, JSONstring);

  const file = editJsonFile(manifestFile);
  const items = file.get("items");

  // Crear los subarchivos del manifest
  for (let i = 0; i < items.length; i++) {
    const canvasJSON = items[i];
    const pageJSON = canvasJSON.items[0];
    const imageJSON = pageJSON.items[0];

    await fs.writeFile(`${staticBase}/canvas-${i}.json`, JSON.stringify(canvasJSON, null, 2));
    await fs.writeFile(`${staticBase}/page-${i}.json`, JSON.stringify(pageJSON, null, 2));
    await fs.writeFile(`${staticBase}/image-${i}.json`, JSON.stringify(imageJSON, null, 2));
  }

  return { manifestUrl: manifestPath, manifestUrlDev: manifestPathDev}
}

async function createIIIFSizes(inputPath, outputFolder) {
  const sizes = [];

  await mkDir(`${outputFolder}/full/max/0/`);
  await new Promise( r => {
    sharp(inputPath)
      .jpeg({quality: 100})
      .toFile(`${outputFolder}/full/max/0/default.jpg`, (err, info) => {
        sizes.push({width: info.width, height: info.height});
        r(info);
      });
  });

  const sizesList = [256, 512];
  for (let width of sizesList) {
    await mkDir(`${outputFolder}/full/${width},/0/`);
    await new Promise( r => {
      sharp(inputPath)
        .resize({ width: width })
        .jpeg({quality: 100})
        .toFile(`${outputFolder}/full/${width},/0/default.jpg`, (err, info) => {
          sizes.push({width: info.width, height: info.height});
          r(info);
        });
    });
  }

  // const file = editJsonFile(`${outputFolder}/info.json`);
  // file.set("sizes", sizes);
  // file.save();

  return sizes
}

async function createIIIFDerivatives(inputPath, outputFolder, pid) {
  // Check if image format is valid
  // {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
  const placeholder = "[[[ROUTE_PLACEHOLDER]]]";

  await new Promise(r => {
    sharp(inputPath).tile({
      size: 512,
      layout: "iiif3",
      id: placeholder
    }).toFile(outputFolder, (err, info) => {
      r(info);
    });
  });

  const infoFile = `${outputFolder}/info.json`;
  const infoDevFile = `${outputFolder}/_info.json`;

  await fs.copyFile(infoFile, infoDevFile);

  const file = editJsonFile(infoFile);
  const id = file.get("id").replace(placeholder, `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}`);
  file.set("id", id);
  file.save();

  const fileDev = editJsonFile(infoDevFile);
  const idDev = fileDev.get("id").replace(placeholder, `${localBase}${serieConfig.baseurl}/iiif/${pid}`);
  fileDev.set("id", idDev);
  fileDev.save();
}

async function copyData() {
  if (existsSync(srcConfigPath)) {
    await fs.rm(srcConfigPath, { recursive: true, force: true }, () => {});
  }

  await mkDir(srcConfigPath);
  await fs.copyFile(dataPath + configFile, srcConfigPath + configFile);

  processMsg("TASK: copied config file");
}

async function mkDir(path) {
  if (existsSync(path)) return
  try {
    await fs.mkdir(path, {recursive: true});
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

function errorMsg(type, msg) {
  console.error("\x1b[41m\x1b[30m%s\x1b[0m",`${type.toUpperCase()} ERROR: ${msg}`);
}

function processMsg(msg) {
  console.log("\x1b[32m%s\x1b[0m", msg);
}

// PATCH
function toJSONString(manifest) {
  // Este es un patch de la función por defecto para exportar el manifest
  // Porque la original muestra en la consola un aviso y daña la barra de avance
  let obj = Object.assign({}, manifest);
  const labelString = {"label": getObject(obj.label)};
  const itemString = {"items": manifest.items};
  obj = Object.assign(obj, labelString);
  obj = Object.assign(obj, itemString);
  return JSON.stringify(obj, null, 2);

  function getObject(label) {
    const array_of_values = {};
    for(const key of label.languageMap.keys()){
      const element = label.languageMap.get(key) || [];
      const key1 = key;
      if (element.length === undefined && element.length <= 0){
        continue;
      }
      array_of_values[key1] = element;
    }
    return array_of_values;
  }
}