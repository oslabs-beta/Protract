import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';
import { Item } from './../../types';

export default function CodePreview(props: { tags: Item[]; currComp: Item }) {
  const { tags, currComp } = props;

  const [preview, setPreview] = useState('');

  //Convert the user input component into the Angular mandated syntax
  let compName;
  if (typeof currComp.value === 'string') {
    compName = currComp.value.toLowerCase().replace(' ', '-');
  } else {
    compName = currComp.value;
  }

//Boilerplate Angular HTML code added to code preview. Prefix are the items that occur before the HTML tags and components.
  const prefix = [
    "import { Component } from '@angular/core';\n",
    "import { CommonModule } from '@angular/common';\n",
    '@Component({\n',
    `  selector: \'${compName}\',\n`,
    '  standalone: true,\n',
    '  imports: [CommonModule],\n',
    '  template: `\n',
  ];

  //Boilerplate Angular HTML code added to code preview. Suffix are the items that occur after the HTML tags and components
  const suffix = [
    `   \`\n`,
    `   styleUrls: [\'${compName}.component.css\']\n`,
    '})\n',
    `export class ${currComp.value}Component {};`,
  ];

  //Updates the code preview whenever the Canvas items are updated including additions and reordering.
  useEffect(() => {
    const canvasCodeArr = tags.map((ele) => `       ${ele.code}`);
    const finArr = prefix.concat(canvasCodeArr).concat(suffix);
    setPreview(finArr.join(''));
  }, [tags]);

  return (
    <div id="codePreview" className="flex-grow border-0 border-solid border-yellow-400">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={preview}
        options={{
          readOnly: true,
          lineNumbers: 'on',
          minimap: { enabled: false },
          wordWrap: 'off',
          scrollbar: { vertical: 'hidden' },
          scrollBeyondLastLine: false,
          scrollBeyondLastColumn: 0,
          selectionHighlight: false,
          occurrencesHighlight: false,
          lineDecorationsWidth: 10,
          selectOnLineNumbers: false,
          lineNumbersMinChars: 3,
          lineHeight: 20,
          showUnused: false,
          folding: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
