#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const template = require('./template');
const commander = require('commander');

commander.arguments('<parent-folder> <component-folder>').action((parentName, componentName) => {
  componentFolder = componentName;
  parentFolder = parentName;
});

commander.parse(process.argv);

const checkArguments = () => {
  if (typeof componentFolder === 'undefined' || typeof parentFolder === 'undefined') {
    console.error('command requires format: make-ts-component <parent-folder> <component-folder>');
    process.exit(1);
  }
};

const checkFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`${folder} folder created!`);
  }
};

const createComponentFile = (parentName, componentName) => {
  checkArguments();

  const components = path.resolve('components');
  const parentOfComponent = path.resolve('components/' + parentFolder);
  const nameOfComponent = path.resolve('components/' + parentFolder + '/' + componentName);

  checkFolderExists(components);
  checkFolderExists(parentOfComponent);
  checkFolderExists(nameOfComponent);

  const tsx = template.createFCTsx(componentName);
  const test = template.createTestTsx(componentName);
  const index = [`import ${componentName} from "./${componentName}";`, '', `export default ${componentName};`];

  tsx.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${componentName}.tsx`, line);
    fs.appendFileSync(`${nameOfComponent}/$componentName}.tsx`, '\n');
  });

  test.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/${componentName}.test.tsx`, line);
    fs.appendFileSync(`${nameOfComponent}/${componentName}.test.tsx`, '\n');
  });

  index.forEach((line) => {
    fs.appendFileSync(`${nameOfComponent}/index.ts`, line);
    fs.appendFileSync(`${nameOfComponent}/index.ts`, '\n');
  });
  console.log(`Component ${componentName} has been created in ${parentFolder} folder`);
};

createComponentFile(parentFolder, componentFolder);
