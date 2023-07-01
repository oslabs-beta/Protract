import { UniqueIdentifier } from "@dnd-kit/core";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

// helper function to generate app.component.ts contents
// input: a componentName string, typed as UniqueIdentifier
// output: a large string containing the testing file code
export function generateTestContents(componentName: UniqueIdentifier) {
  const pascalCompName = capitalizeFirstLetter(componentName.toString());
  const importStatement = `import { TestBed } from '@angular/core/testing';
import { ${capitalizeFirstLetter(pascalCompName.toString())}Component } from './${componentName}.component';`;

  const testContents = `
describe('${pascalCompName}', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [${pascalCompName}Component]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(${pascalCompName}Component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
`;

  return importStatement + testContents;
}
