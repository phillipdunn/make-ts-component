const fs = require('fs');
const path = require('path');
const template = require('./template');
const commander = require('commander');

const camelCase = (str) => {
  return str[0].toLowerCase() + str.slice(1);
};

commander.arguments('<component-folder>').action((componentName) => {
  componentFolder = componentName;
});

commander.parse(process.argv);

const checkArguments = () => {
  if (typeof componentFolder === 'undefined') {
    console.error('command requires format: make-ts-component <component-folder>');
    process.exit(1);
  }
};

const checkFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`${folder} folder created!`);
  }
};

const createComponentFile = (componentName) => {
  checkArguments();

  const components = path.resolve('components');
  const nameOfComponent = path.resolve('components/' + componentName);

  checkFolderExists(components);
  checkFolderExists(nameOfComponent);

  const tsx = template.createFCTsx(componentName);
  const test = template.createTestTsx(componentName);
  const index = [`import ${componentName} from './${componentName}';`, '', `export default ${componentName};`];

  tsx.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${componentName}.tsx`, line);
    fs.appendFileSync(`${nameOfComponent}/${componentName}.tsx`, '\n');
  });

  test.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${camelCase(componentName)}.test.tsx`, line);
    fs.appendFileSync(`${nameOfComponent}/${camelCase(componentName)}.test.tsx`, '\n');
  });

  index.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/index.ts`, line);
    fs.appendFileSync(`${nameOfComponent}/index.ts`, '\n');
  });
  console.log(`Component ${componentName} has been created in components folder`);
};

createComponentFile(componentFolder);
