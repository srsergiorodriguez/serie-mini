import sharp from 'sharp';
import lunr from 'lunr';
import fs from 'fs/promises';
import cliProgress from 'cli-progress';

import { createReadStream, readdirSync, existsSync } from 'fs';
import serieConfig from './data/serie.config.js';
import process from 'process';
import csvParser from 'csv-parser';

// Puedo hacer la cli acá para determinar tareas

const mode = process.argv[2];
const localBase = "http://localhost:5173"; // Puedo dejar una opción de escoger el host
const localBuild = "http://localhost:5500";

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
  const metadata = await parseMetadata();
  await createMetadataJS(metadata);
  await createSearchIndex(metadata);
  await batchProcessImages(metadata);
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
      console.log(`Couldn't find corresponding image for ${e.pid}`);
    }
    // Check if valid image format
    // Podría hacer esto de forma asíncrona?
    await createThumbnails(`${dataPath}${imagesFolder}${filename}`, `${thumbsPath}${filename}`);
    await createIIIFDerivatives(e.pid, `${dataPath}${imagesFolder}${filename}`);

    i++;
    progressBar.update(i);
  }

  progressBar.stop();
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

async function createIIIFDerivatives(pid, imageUrl) {
  // Check if image format is valid
  const outputFolder = `${derivativesPath}${pid}`;
  const tileSize = 512; // Set the tile size
  await generateIIIFLevel0ImageTiles(imageUrl, outputFolder, tileSize);
}

async function generateIIIFLevel0ImageTiles(inputPath, outputFolder, tileSize) {
  // {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
  await sharp(inputPath).tile({
    size: tileSize,
    layout: "iiif3",
    id: mode === "dev" ? `${localBase}${serieConfig.baseurl}/iiif` : mode === "local" ? `${localBuild}/docs/iiif` : `${serieConfig.base}${serieConfig.baseurl}/iiif`
  }).toFile(outputFolder, (err, info) => {
    // console.log(info);
  }); 
}

async function copyData() {
  await mkDir(srcConfigPath);
  await fs.copyFile(dataPath + configFile, srcConfigPath + configFile);

  await mkDir(staticDataPath);
  await fs.copyFile(dataPath + metadataFile, staticDataPath + metadataFile);

  await mkDir(staticDataPath + imagesFolder);

  const imagesFilenames = readdirSync(dataPath + imagesFolder);
  for (let e of imagesFilenames) {
    await fs.copyFile(dataPath + imagesFolder + e, staticDataPath + imagesFolder + e);
  }
  processMsg("TASK: copied new data");
}

async function mkDir(path) {
  try {
    await fs.mkdir(path);
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