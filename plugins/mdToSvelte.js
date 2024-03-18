import {readdirSync} from 'fs';
import FM from 'front-matter';
import fs from 'fs/promises';

const contentFolder = "content/";
const dataPath = "./data/";
const srcConfigPath = "./src/routes/data/";
const mdFile = "md.js";

mdToSvelte(true);

export default async function mdToSvelte(upd) {
  if (upd) processMsg("TASK: content from Markdown");
  const filenames = readdirSync(`${dataPath}${contentFolder}`, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  const mdVariables = {};

  for (let f of filenames) {
    const md = await fs.readFile(`${dataPath}${contentFolder}${f}`,'utf8');
    const frontMatter = FM(md);
    // frontMatter.body = replaceComponents(frontMatter.body);
    mdVariables[frontMatter.attributes.name] = frontMatter;
  }

  await fs.writeFile(`${srcConfigPath}${mdFile}`, `export const mdData = ${JSON.stringify(mdVariables)};`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  });
}

function processMsg(msg) {
  console.error("\x1b[32m%s\x1b[0m", msg);
}

function replaceComponents(body) {
  let newBody = body;

  const componentPattern = `{![ ]+(?<component>[a-z]+)((?<args>[ ]+(["'a-z0-9]+[ ]+)*)|[ ]+)!}`;
  const regex = new RegExp(componentPattern,"ig");

  const components = {
    item: {component: "<ItemPreview $ />", args: ["pid"]}
  };

  const matches = body.match(regex);

  if (matches !== null) {
    for (let m of matches) {
      const capture = regex.exec(m);
      const component = components[capture.groups.component];
      const args = capture.groups.args.trim().split(/[ ]+/);
      
      if (args.length < component.args.length) {
        console.error(`Arguments incomplete for ${m}, component was ignored`);
        continue
      }

      let argsString = "";
      for (let i = 0; i < component.args.length; i++) {
        const key = component.args[i];
        const value = args[i];
        argsString += `${key}={${value}}`
      }

      const replacement = component.component.replace("$", argsString);

      newBody = newBody.replace(m, replacement);
      console.log(m);
    }
    console.log(newBody);
  }

  return newBody;
}