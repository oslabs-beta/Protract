import { saveAs } from 'file-saver';
import { Item } from '../../types';
import JSZip from 'jszip';
import { traverseAndWrite } from './traverseAndWrite';
import { generateImportStatements } from './generateImportStatements';
import { generateAppModule } from './generateAppModule';
import { generateComponentContents } from './generateComponentContents';
import { generateTestContents } from './generateTestContents';

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

export default zipFiles;
