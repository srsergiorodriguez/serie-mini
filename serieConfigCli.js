import inquirer from 'inquirer';
import { createReadStream } from 'fs';
import fs from 'fs/promises';
import csvParser from 'csv-parser';

const dataPath = "./data/";
const metadataFile = "metadata.csv";
const configFile = "serie.config.js";

function getQuestions(lang, keys) {
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: {
        es: 'Nombre de usuario de GitHub en donde alojarás la colección:',
        en: 'GitHub username:'
      }
    },
    {
      type: 'input',
      name: 'repo',
      message: {
        es: 'Nombre del repositorio que alojará la colección:',
        en: 'Name of the repository that will host the collection:'
      },
      default: 'serie-mini'
    },
    {
      type: 'input',
      name: 'title',
      message: {
        es: 'Título de la colección (aparecerá en el encabezado del sitio web):',
        en: 'Title of the collection (it will appear in the header of the website):'
      },
      default: 'Serie Mini'
    },
    {
      type: 'input',
      name: 'subtitle',
      message: {
        es: 'Subtítulo de la colección (aparecerá en una fuente pequeña en el encabezado del sitio web):',
        en: 'Subtitle of the collection (it will appear in a smaller font in the header of the website):'
      },
      default: 'Un sistema para mini colecciones digitales'
    },
    {
      type: 'input',
      name: 'credits',
      message: {
        es: 'Mensaje de los créditos (por ejemplo, tu nombre. Aparecerá en el pie de página del sitio web):',
        en: 'Text to show in credits (for instance, your name. It will appear in the footer of the website):'
      },
      default: 'Por Sergio Rodríguez Gómez'
    },
    {
      type: 'input',
      name: 'copyright',
      message: {
        es: 'Mensaje de copyright (aparecerá en el pie de página del sitio web):',
        en: 'Copyright text (it will appear in the footer of the website):'
      },
      default: "Todos los derechos reservados, " + new Date().getFullYear()
    },
    {
      type: 'checkbox',
      name: 'metadataToShow',
      message: {
        es: 'Selecciona qué metadatos mostrar en la página de cada ítem de la colección:',
        en: "Select what metadata to show in an item's page"
      },
      choices: keys
    },
    {
      type: 'checkbox',
      name: 'metadataToIndex',
      message: {
        es: 'Selecciona qué metadatos indexar en el buscador (es decir, qué datos quieres que sean buscables dentro de la colección):',
        en: 'Select what metadata to index for search (what metadata to make searchable in the search bar)'
      },
      choices: keys
    },
  ].map(d => ({...d, message: d.message[lang]}));

  return questions
}

startConfig();

async function startConfig() {

  let selectedLang = "es";
  const language = await inquirer.prompt({
    type: 'list',
    name: 'lang',
    message: 'Selecciona idioma / Select language',
    choices: [ 'Español', 'English' ]
  });

  if (language.lang === 'Español') {
    selectedLang = 'es';
  } else if (language.lang === 'English') {
    selectedLang = 'en';
  }

  const metadata = await parseMetadata();
  const keys = Object.keys(metadata[0]);
  const questions = getQuestions(selectedLang, keys);

  msg(
    {
      es: "\nEste programa de Serie Mini te guiará paso a paso en la configuración de tu colección. Responde las siguientes preguntas...\n",
      en: "\nThis program will guide you step by step in the configuration of your collection. Answer the following questions...\n"
    }[selectedLang], "blue");
  const answers = await inquirer.prompt(questions);

  msg({
    es: "\nEstas fueron tus configuraciones elegidas: \n",
    en: "\nThese are the settings you selected:\n"
  }[selectedLang],"blue");
  console.log(answers);

  const confirmanswer = await inquirer.prompt({
    type: 'list',
    name: 'confirm',
    message: {
      es: '¿Son correctas?',
      en: 'Are they correct?'
    }[selectedLang],
    choices: {
      es: [ 'Sí', 'No' ],
      en: [ 'Yes', 'No' ]
    }[selectedLang]
  });

  if (confirmanswer.confirm === "No") {
    msg(
      {
        es: "\nEmpecemos de nuevo\n",
        en: "\nLet's start over again\n"
      }[selectedLang],"red");
    startConfig();
    return
  }

  const config = formatConfig(selectedLang, answers);

  await fs.writeFile(`${dataPath}${configFile}`, `const config = ${JSON.stringify(config, null, 2)};\nexport default config;`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  });
}

function formatConfig(lang, answers) {
  const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const config = {
    lang: lang,
    localPort: "5173",
    base: `https://${answers.username}.github.io`,
    baseurl: `/${answers.repo}`,
    title: answers.title,
    subtitle: answers.subtitle,
    credits: answers.credits,
    copyright: answers.copyright,
    pages: {
      iiifViewer: true,
      metadataToShow: answers.metadataToShow.map(d => {
        return { key: d, label: firstUppercase(d), type: "text"}
      }),
      metadataToIndex: answers.metadataToIndex
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
    errorMsg("metadata", "Los metadatos no tienen pid o label (minúsculas) / Metadata doesn't have pid or label (lowercase)");
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

function errorMsg(type, msg) {
  console.error("\x1b[41m\x1b[30m%s\x1b[0m",`${type.toUpperCase()} ERROR: ${msg}`);
}