import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

// helper function to generate import statements
// input: array of modules as strings, path
// output: import statement as a string
export function generateImportStatements(modules: string[]) {
  let importStatements = `import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n`;
  for (const module of modules) {
    const path = `./components/${module}/${module}.component`;
    importStatements += `import { ${capitalizeFirstLetter(module)}Component } from '${path}';\n`;
  }
  return importStatements;
}
