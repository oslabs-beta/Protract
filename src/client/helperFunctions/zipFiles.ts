import { saveAs } from 'file-saver';
import { Item } from '../../types';
import JSZip from 'jszip';
import { UniqueIdentifier } from '@dnd-kit/core';

//function to create a zip file for export in web app
const zipFiles = (app: Item) => {
  //initializes zip
  const zip = new JSZip();
  // change project name to template literal of current project
  const angularProject = zip.folder('angularProject');
  //creates app folder inside of zip folder
  const appFolder = angularProject?.folder('app');

  // create app.component.html, .css, .spec.ts, .ts

  appFolder?.file('app.component.html', '');
  appFolder?.file('app.component.css', '');
  const appCode:any = [];
  if (app.children.length) {
    app.children.map(child => appCode.push(child.code));
  }


  appFolder?.file('app.component.ts', generateComponentContents(appCode, app.value))
  appFolder?.file('app.component.spec.ts', generateTestContents('app'));

  // create components folder
  const componentsFolder = appFolder?.folder('components');

  // iterate through app, and create file structure with corresponding code for each component
  // also populates global components array, for future parsing to populate app.module.ts file
  const components:string[] = [];

  traverseAndWrite(app, componentsFolder, components);

  const importStatements = generateImportStatements(components);

  const appModuleContents = generateAppModule(components);
  appFolder?.file('app.module.ts', appModuleContents);

  // export zipped folder
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "angularProject.zip");
  });

};


// function to iterate through comps[], for each 'canEnter' node, create a folder named (property of) 'value', componentFiles.map()
// input: comps
// output: none, but componentsFolder will populate
function traverseAndWrite(node: Item, componentsFolder: JSZip|null|undefined, components:UniqueIdentifier[]): void {
  const { value, code, canEnter, children } = node;

  // if the current node is a component within app, then create corresponding angular component folder contents
  if (canEnter && value !== 'app' ) {

    // push component's name (also acts as the component selector string) into the global components array
    components.push(value);
    // create an individual component folder inside of the components folder
    const componentFolder = componentsFolder?.folder(`${value}`);

    // populate this folder with angular component files
    const staticComponentFiles = ['.component.html', '.component.css'];
    // CURRENT MAP FUNCTION IS ONLY FOR MVP, FIGURE OUT LOGIC LATER
    // go into .ts file, write boilerplate with corresponding 'code' property contents into the file
    staticComponentFiles.map(fileName => componentFolder?.file(`${value}${fileName}`, ''));

    // array to hold the current component's corresponding children html tags
    const componentTags:string[] = [];

    // if there are children, then write the corresponding children code into the current component's component.ts file, then recurse and complete the rest of the file directory
    if (children) {
      children.map(child => {
        if (child.code) componentTags.push(child.code);
        traverseAndWrite(child, componentsFolder, components);
      })
      const componentContents = generateComponentContents(componentTags, value);
      const testContents = generateTestContents(value);
      componentFolder?.file(`${value}.component.ts`, componentContents);
      componentFolder?.file(`${value}.component.spec.ts`, testContents);
    }
  } else {
    if (children.length) {
      children.map(child => traverseAndWrite(child, componentsFolder, components));
    }
  }

};

// helper function to generate import statements
// input: array of modules as strings, path
// output: import statement as a string
function generateImportStatements(modules: string[]) {
  let importStatements = `import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n`;
  for (const module of modules) {
    const path = `./components/${module}/${module}.component`;
    importStatements += `import { ${module}Component } from '${path}';\n`;
  }
  return importStatements;
}

// helper function to generate app.module.ts contents
// input: array of arrays, each containing modules, to import (these correspond to each component's selector string)
// output: formatted string of desired app.module.ts contents
function generateAppModule(modules: string[]) {
  const importStatements = generateImportStatements(modules);
  const appComponentImport = `import { AppComponent } from './app.component';\n`; // Add the import statement for AppComponent
  const ngModule = `
@NgModule({
  declarations: [
    ${modules.map(module => `${module}Component`).join(',\n    ')},
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
`;
  return importStatements + appComponentImport + ngModule + '\nexport class AppModule { }';
}


// helper function to generate app.component.ts contents
// input: array of html tags as strings, and a componentName as a string (typed as UniqueIdentifier)
// output: a large string containing the component's contents
function generateComponentContents(tags: string[], componentName: UniqueIdentifier) {
  let selector = componentName.toString().toLowerCase();
  if (componentName === 'app') selector = 'app-root';

  let templateCode = '';
  if (tags !== undefined) {
    templateCode = tags.map(tag => `\n    ${tag}`).join('');
  }

  const componentContents = `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '${selector}',
  template: \`${templateCode}
\`,
  styleUrls: ['${componentName}.component.css']
})
export class ${capitalizeFirstLetter(componentName.toString())}Component {
}
`;

  return componentContents;
}

// helper function that returns a string input with its first letter capitalized
function capitalizeFirstLetter(tag: string) {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}


// helper function to generate app.component.ts contents
// input: a componentName string, typed as UniqueIdentifier
// output: a large string containing the testing file code
function generateTestContents(componentName: UniqueIdentifier) {
  const importStatement = `import { TestBed } from '@angular/core/testing';
import { ${componentName}Component } from './${componentName}.component';`;

  const testContents = `
describe('${componentName}', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [${componentName}Component]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(${componentName}Component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
`;

  return importStatement + testContents;
}





export default zipFiles;

// update app.module.ts
