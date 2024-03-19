import inquirer from 'inquirer';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import csvParser from 'csv-parser';

const dataPath = "./data/";
const metadataFile = "metadata.csv";
const configFile = "serie.config.js";

function getQuestions(keys) {
  const questions = [
    {
      type: 'input',
      name: 'Usuario GitHub',
      message: 'Nombre de usuario de GitHub en donde alojarás la colección:'
    },
    {
      type: 'input',
      name: 'Nombre Repositorio',
      message: 'Nombre del repositorio que alojará la colección:',
      default: 'serie-mini'
    },
    {
      type: 'input',
      name: 'Título',
      message: 'Título de la colección (aparecerá en el encabezado del sitio web):',
      default: 'Serie Mini'
    },
    {
      type: 'input',
      name: 'Subtítulo',
      message: 'Subtítulo de la colección (aparecerá en una fuente pequeña, en el encabezado del sitio web):',
      default: 'Una plataforma para mini colecciones digitales'
    },
    {
      type: 'input',
      name: 'Créditos',
      message: 'Mensaje de los créditos (por ejemplo, tu nombre. Aparecerá en el pie de página del sitio web):',
      default: 'Por Sergio Rodríguez Gómez. Hecho con Serie Mini'
    },
    {
      type: 'input',
      name: 'Mensaje Copyright',
      message: 'Mensaje de copyright (aparecerá en el pie de página del sitio web):',
      default: "Todos los derechos reservados, " + new Date().getFullYear()
    },
    {
      type: 'checkbox',
      name: 'Metadatos para mostrar',
      message: 'Selecciona qué metadatos mostrar en la página de cada ítem de la colección:',
      choices: keys
    },
    {
      type: 'checkbox',
      name: 'Metadatos buscables',
      message: 'Selecciona qué metadatos indexar en el buscador (es decir, qué datos quieres que sean buscables dentro de la colección):',
      choices: keys
    },
  ]

  return questions
}

startConfig();

async function startConfig() {
  const metadata = await parseMetadata();
  const keys = Object.keys(metadata[0]);
  const questions = getQuestions(keys);

  msg("\nEste programa de Serie Mini te guiará paso a paso en la configuración de tu colección. Responde las siguientes preguntas...\n", "blue");

  const answers = await inquirer.prompt(questions);

  msg("\nEstas fueron tus configuraciones: \n", "blue");
  console.log(answers);

  const confirmanswer = await inquirer.prompt({
    type: 'list',
    name: 'confirm',
    message: '¿Son correctas?',
    choices: [ 'Sí', 'No' ]
  });

  if (confirmanswer.confirm === "No") {
    msg("\nEmpecemos de nuevo\n", "red");
    startConfig();
    return
  }

  const config = formatConfig(answers);

  await fs.writeFile(`${dataPath}${configFile}`, `const config = ${JSON.stringify(config, null, 2)};\nexport default config;`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  });
}

function formatConfig(answers) {
  const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const config = {
    lang: "es",
    base: `https://${answers["Usuario GitHub"]}.github.io`,
    baseurl: `/${answers["Nombre Repositorio"]}`,
    title: answers["Título"],
    subtitle: answers["Subtítulo"],
    credits: answers["Créditos"],
    copyright: answers["Mensaje Copyright"],
    pages: {
      iiifViewer: true,
      metadataToShow: answers["Metadatos para mostrar"].map(d => {
        return { key: d, label: firstUppercase(d), type: "text"}
      }),
      metadataToIndex: answers["Metadatos buscables"]
    }
  }

  return config
}

function msg(msg, color = "red") {
  const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
  }
  console.log(`${colors[color]}%s\x1b[0m`, msg);
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