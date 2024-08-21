import {readdirSync} from 'fs';
import FM from 'front-matter';
import fs from 'fs/promises';

const contentFolder = "content/";
const dataPath = "./data/";
const srcRoutesPath = "./src/routes/";

svxToSvelte(true);

export default async function svxToSvelte(upd) {
  if (upd) processMsg("TASK: content from Markdown");
  const filenames = readdirSync(`${dataPath}${contentFolder}`, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  const mdVariables = {};

  for (let filename of filenames) {
    const md = await fs.readFile(`${dataPath}${contentFolder}${filename}`,'utf8');
    const frontMatter = FM(md);
    mdVariables[frontMatter.attributes.name] = { frontMatter, filename };

    const name = frontMatter.attributes.name;
    if (name === "home") {
      await fs.copyFile(`${dataPath}${contentFolder}${filename}`, `${srcRoutesPath}+page.svx`);
    } else {
      await fs.copyFile(`${dataPath}${contentFolder}${filename}`, `${srcRoutesPath}${name}/+page.svx`);
    }
  }
}

function processMsg(msg) {
  console.error("\x1b[32m%s\x1b[0m", msg);
}