import { saveAs } from 'file-saver';
import { Item } from '../../types';
import JSZip from 'jszip';

//function to create a zip file for export in web app
const zipFiles = (app: Item) => {
  //initializes zip
  const zip = new JSZip();
  // change project name to template literal of current project
  const angularProject = zip.folder('angularProject');
  //creates src folder inside of zip folder
  const srcFolder = angularProject.folder('src');

  // go into src folder
  // create app folder 
  const appFolder = srcFolder.folder('app');

  // go into app folder
  // create app.component.html, .css, .spec.ts, .ts, .module.ts ONCE
  const appFiles = ['app.component.html', 'app.component.css', 'app.component.spec.ts', 'app.component.ts', 'app.module.ts'];
  appFiles.map((ele)=> appFolder.file(ele, 'example text'));
  // appFolder.file('test', 'some text');

  // create components folder
  const componentsFolder = appFolder.folder('components');

  // go into components folder
  // iterate through input comps (or app object),
  // traverseAndWrite(app);

  // // function to iterate through comps[], for each 'canEnter' node, create a folder named (property of) 'value', componentFiles.map()
  // // input: comps
  // // output: none, but componentsFolder will populate

  function traverseAndWrite(node: Item): void {

    if (node.canEnter && node.value !== 'app' ) {
      // create an individual component folder inside of the components folder
      const componentFolder = componentsFolder.folder(`${node.value}`);
      // populate this folder with angular component files
      const componentFiles = ['.component.html', '.component.css', '.component.spec.ts', '.component.ts'];
      // CURRENT MAP FUNCTION IS ONLY FOR MVP, FIGURE OUT LOGIC LATER
      // go into .ts file, write boilerplate with corresponding 'code' property contents into the file
      const text = 'a bunch of really cool code\n'
      componentFiles.map(fileName => componentFolder.file(`${node.value}${fileName}`, text.repeat(100)));
    }

    if (node.children) {
      node.children.map(child => {
        traverseAndWrite(child);
      })
    }

    
  }

  traverseAndWrite(app);

  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "angularProject.zip");
  });

};

export default zipFiles;

// update app.module.ts
