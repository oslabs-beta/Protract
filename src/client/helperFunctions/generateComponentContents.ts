import { UniqueIdentifier } from "@dnd-kit/core";
import { insertAppPrefix } from "./insertAppPrefix";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

// helper function to generate app.component.ts contents
// input: array of html tags as strings, and a componentName as a string (typed as UniqueIdentifier)
// output: a large string containing the component's contents
export function generateComponentContents(tags: string[], componentName: UniqueIdentifier) {
  let selector = componentName.toString().toLowerCase();
  if (componentName === 'app') selector = 'app-root';

  // const modifiedTags = insertAppPrefix(tags);

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
