import { generateImportStatements } from "./generateImportStatements";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

// helper function to generate app.module.ts contents
// input: array of arrays, each containing modules, to import (these correspond to each component's selector string)
// output: formatted string of desired app.module.ts contents
export function generateAppModule(modules: string[]) {
  const importStatements = generateImportStatements(modules);
  const appComponentImport = `import { AppComponent } from './app.component';\n`; // Add the import statement for AppComponent
  const ngModule = `
@NgModule({
  declarations: [
    ${modules.map(module => `${capitalizeFirstLetter(module)}Component`).join(',\n    ')},
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
