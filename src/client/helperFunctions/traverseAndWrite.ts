import { Item } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";
import JSZip from "jszip";
import { generateComponentContents } from "./generateComponentContents";
import { generateTestContents } from "./generateTestContents";

// function to iterate through comps[], for each 'canEnter' node, create a folder named (property of) 'value', componentFiles.map()
// input: comps
// output: none, but componentsFolder will populate
export function traverseAndWrite(node: Item, componentsFolder: JSZip|null|undefined, components:UniqueIdentifier[]): void {
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
