import { saveAs } from 'file-saver';
import { Item } from '../../types';
const JSZip = require("jszip");

//function to create a zip file for export in web app
const zipFiles = (state: Item[]) => {
  //initializes zip
  var zip = new JSZip();
  let angularProject = zip.folder('angularProject');
  //creates src folder inside of zip folder
  let srcFolder = angularProject.folder('src');

  // go into src folder
  // create app folder 
  let appFolder = srcFolder.folder('app');

  // go into app folder
  // create app.component.html, .css, .spec.ts, .ts, .module.ts ONCE
  const componentFiles = ['app.component.html', 'app.component.css', 'app.component.spec.ts', 'app.component.ts', 'app.module.ts'];
  componentFiles.map((ele)=> appFolder.file(ele));

  // create components folder
  let componentsFolder = appFolder.folder('components');

  // go into components folder
  // iterate through input comps (or app object),

  // function to iterate through comps[], for each 'canEnter' node, create a folder named (property of) 'value', componentFiles.map()
  function handleUpdateApp(state: Item[]): Item[] {
    return comps.map((comp) => {
      if (comp.id === currComp.id && comp.children) {
        comp.children.push(newComp);
      } else {
        comp.children = handleUpdateApp(comp.children, currComp, newComp);
      }
      return comp;
    });
  }




    // create app.componen.html, .css, .spec.ts, .ts per node that has property 'canEnter'
      // go into .ts file, write boilerplate with corresponding 'code' property contents into the file
    //writes a file with default index.html code


  angularProject.file('index.html', '<!DOCTYPE html> <html>   <head>     <meta charset="UTF-8" />     <link rel="stylesheet" href="styles.css">     <title>ReacType App</title>   </head>   <body>     <div id="root"></div>   </body> </html>');
  //writes each component as its own file in the component folder
  for (let i in state.components){
    componentFolder.file(`${state.components[i].name}.jsx`, state.components[i].code);
  }
  //writes our css file
    angularProject.file('style.css', state.stylesheet);
  //zips the file and saves to local machine
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "ReacTypeApp.zip");
  });
};

export default zipFiles;

/*

input:
comps = [
  {
    value: app,
    canEnter: true,
    children: [
      {value: comp1, etc.},
      {value: comp2, etc.},
      {value: comp3, etc.}
    ]
  }
]
output: zipped folder (blob)

// create a src folder
// go into src folder
// create app folder 
// go into app folder
// create app.componen.html, .css, .spec.ts, .ts, .module.ts ONCE
// create components folder
// go into components folder
// iterate through input comps (or app object),
  // create app.componen.html, .css, .spec.ts, .ts per node that has property 'canEnter'
    // go into .ts file, write boilerplate with corresponding 'code' property contents into the file



src{
  app{
    app.module.ts --> logic to import custom component name, then add custom component name to declarations property in @NgModule
    app.component.html
    app.component.css
    app.component.spec.ts
    app.component.ts
    components{
      comp1{
        comp1.html
        comp1.css
        comp1.component.spec.ts
        comp1.component.ts
      }
      comp2{
        comp2.html
        comp2.css
        comp2.component.spec.ts
        comp2.component.ts
      }
    }
  } 
}    


*/

// update app.module.ts