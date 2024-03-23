import sharp from 'sharp';
import lunr from 'lunr';
import fs from 'fs/promises';
import editJsonFile from 'edit-json-file';
import cliProgress from 'cli-progress';
import I3 from "@digital-piranesi/iiif-manifest-library";

import { createReadStream, readdirSync, existsSync } from 'fs';
import serieConfig from './data/serie.config.js';
import csvParser from 'csv-parser';

const localBase = `http://localhost:${serieConfig.localPort}`;

const configFile = "serie.config.js";
const metadataFile = "metadata.csv";
const imagesFolder = "raw_images/";

const dataPath = "./data/";
const srcConfigPath = "./src/config/";
const staticDataPath = "./static/data/";
const derivativesPath = "./static/iiif/";
const thumbsPath = "./static/thumbs/";

const metadataPath = "./src/routes/data/metadata.js";
const indexPath = "./src/routes/data/searchIndex.js";

main();

async function main() {
  // Delete the IIIF derivatives folder
  await deleteCopiedData();

  // Copy the config file to use its data in svelte
  await copyData();

  // Create the Collection: IIIF derivatives and adjunts metadata
  await createCollection();
}

async function deleteCopiedData() {
  if (existsSync(derivativesPath)) {
    await fs.rm(derivativesPath, { recursive: true, force: true }, () => {});
  }
  if (existsSync(thumbsPath)) {
    await fs.rm(thumbsPath, { recursive: true, force: true }, () => {});
  }
  if (existsSync(staticDataPath)) {
    await fs.rm(staticDataPath, { recursive: true, force: true }, () => {});
  }
  if (existsSync(srcConfigPath)) {
    await fs.rm(srcConfigPath, { recursive: true, force: true }, () => {});
  }
  processMsg("TASK: deleted previous files");
}

async function parseMetadata() {
  const results = [];
  await new Promise(r => {
    createReadStream(dataPath + metadataFile)
      .pipe(csvParser())
      .on('data', data => results.push(data))
      .on('end', () => r(results))
  });

  // VALIDATION
  // Empty metadata
  if (results.length <= 0) {
    errorMsg("metadata", "Metadata is empty / Los metadatos están vacíos");
    process.exit(1);
  }

  // Unique pids
  if ([...new Set(results.map(d => d.pid))].length !== results.length) {
    errorMsg("metadata", "There are non unique pids / Hay pids que no son únicos");
    process.exit(1);
  }

  // Has pids and labels
  for (let e of results) {
    if (e.pid === undefined || e.label === undefined) {
      errorMsg("metadata", "There are rows without pids or labels / Hay filas sin pids o labels");
      process.exit(1);
    }
  }  

  return results
}

async function createCollection() {
  let metadata = await parseMetadata();
  await createSearchIndex(metadata);
  metadata = await batchProcessImages(metadata);
  await createMetadataJS(metadata);
  processMsg("TASK: created collection elements");
}

async function createSearchIndex(metadata) {
  const searchIndex = lunr(function () {
    this.ref("pid");
    const keysToIndex = serieConfig.pages.metadataToIndex.length <= 0 ? Object.keys(metadata[0]) : serieConfig.pages.metadataToIndex;
    for (let k of keysToIndex) {
      this.field(k);
    }
    for (let d of metadata) {
      this.add(d);
    }
  })

  await fs.writeFile(indexPath, `export const searchIndex = ${JSON.stringify(searchIndex)};`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  });
}

async function createMetadataJS(metadata) {
  await fs.writeFile(metadataPath, `export const metadata = ${JSON.stringify(metadata)};`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  });
}

async function batchProcessImages(metadata) {
  await mkDir(derivativesPath);
  await mkDir(thumbsPath);

  const imagesFilenames = readdirSync(dataPath + imagesFolder);

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  processMsg("Processing images...");
  let i = 0;
  progressBar.start(metadata.length, i);
  
  for (let e of metadata) {
    const regex = new RegExp(`^${e.pid}`);
    const filename = imagesFilenames.find(d => regex.test(d));
    if (filename === undefined) {
      console.error(`Couldn't find corresponding image for ${e.pid}`);
    }
    // Check if valid image format
    // Podría hacer esto de forma asíncrona?
    // await createThumbnails(`${dataPath}${imagesFolder}${filename}`, `${thumbsPath}${filename}`);
    await createIIIFDerivatives(`${dataPath}${imagesFolder}${filename}`, `${derivativesPath}${e.pid}`);
    const sizes = await createIIIFSizes(`${dataPath}${imagesFolder}${filename}`, `${derivativesPath}${e.pid}`);
    const { manifestUrl, manifestUrlDev } = await createManifests(e.pid, e.label, sizes[0]);

    e.manifest = manifestUrl;
    e.manifest_dev = manifestUrlDev;

    i++;
    progressBar.update(i);
  }

  progressBar.stop();

  return metadata
}

async function createManifests(pid, label, {width, height}) {
  // ESTA FUNCION ESTA TERRIBLE, PODRIA HACERLA MUCHO MAS ELEGANTE
  await mkDir(`${derivativesPath}${pid}/manifest/`);

  const folderBase = `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}/manifest`;
  // const folderBase = `${localBase}${serieConfig.baseurl}/iiif/${pid}/manifest`; // PARA TESTS
  const manifestPath = `${folderBase}/manifest.json`;
  const staticBase = `${derivativesPath}${pid}/manifest`;
  const manifestPathDev = `${localBase}${serieConfig.baseurl}/iiif/${pid}/manifest/manifest.json`;

  const manifest = new I3.default.Manifest("3", manifestPath);
  manifest.addLabel(new I3.default.Label("en", [label]));

  const canvas = new I3.default.ItemCanvas(`${folderBase}/canvas-1.json`, width, height);
  const page = new I3.default.ItemWebAnnotationPage(`${folderBase}/page-1.json`);
  const image = new I3.default.ItemWebAnnotationImage(`${folderBase}/image-1.json`, "painting", canvas, `${serieConfig.base}${serieConfig.baseurl}/iiif/${pid}/full/max/0/default.jpg`, width, height);

  page.addItem(image); 
  canvas.addItem(page);
  manifest.addItem(canvas);

  // const JSONstring =  manifest.toJSONString(); // Esta es la función original, pero daña la barra de progreso porque imprime algo en la consola
  const JSONstring =  toJSONString(manifest);

  const manifestFile = `${derivativesPath}${pid}/manifest/manifest.json`;
  await fs.writeFile(manifestFile, JSONstring);

  const file = editJsonFile(manifestFile);
  const canvasJSON = file.get("items")[0]; // REVISITAR ESTO CUANDO PUEDA IMPORTAR VARIAS IMÁGENES
  const pageJSON = canvasJSON.items[0];
  const imageJSON = pageJSON.items[0];

  await fs.writeFile(`${staticBase}/canvas-1.json`, JSON.stringify(canvasJSON, null, 2));
  await fs.writeFile(`${staticBase}/page-1.json`, JSON.stringify(pageJSON, null, 2));
  await fs.writeFile(`${staticBase}/image-1.json`, JSON.stringify(imageJSON, null, 2));

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

async function createThumbnails(inputPath, outputFolder) {
  await sharp(inputPath).resize({
    width: 256,
    height: 256,
    fit: 'cover'
  })
  .jpeg({
    quality: 80
  })
  .toFile(outputFolder); 
}

async function createIIIFDerivatives(inputPath, outputFolder) {
  // Check if image format is valid
  // {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
  const placeholder = "[[[ROUTE_PLACEHOLDER]]]";

  await new Promise(r => {
    sharp(inputPath).tile({
      size: 512,
      layout: "iiif3",
      id: placeholder
      // id: mode === "dev" ? `${localBase}${serieConfig.baseurl}/iiif` : mode === "local" ? `${localBuild}/docs/iiif` : `${serieConfig.base}${serieConfig.baseurl}/iiif`
    }).toFile(outputFolder, (err, info) => {
      r(info);
    });
  });

  const infoFile = `${outputFolder}/info.json`;
  const infoDevFile = `${outputFolder}/info_dev.json`;

  await fs.copyFile(infoFile, infoDevFile);

  const file = editJsonFile(infoFile);
  const id = file.get("id").replace(placeholder, `${serieConfig.base}${serieConfig.baseurl}/iiif`);
  file.set("id", id);
  file.save();

  const fileDev = editJsonFile(infoDevFile);
  const idDev = fileDev.get("id").replace(placeholder, `${localBase}${serieConfig.baseurl}/iiif`);
  fileDev.set("id", idDev);
  fileDev.save();
}

async function copyData() {
  await mkDir(srcConfigPath);
  await fs.copyFile(dataPath + configFile, srcConfigPath + configFile);

  await mkDir(staticDataPath);
  await fs.copyFile(dataPath + metadataFile, staticDataPath + metadataFile);

  // await mkDir(staticDataPath + imagesFolder);
  // const imagesFilenames = readdirSync(dataPath + imagesFolder);
  // for (let e of imagesFilenames) {
  //   await fs.copyFile(dataPath + imagesFolder + e, staticDataPath + imagesFolder + e);
  // }

  processMsg("TASK: copied new data");
}

async function mkDir(path) {
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

/// PATCH

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