import Editor from '@monaco-editor/react';
import { useState, useEffect } from 'react';
import {Item} from './../../types'

export default function CodePreview(props: { tags: Item[], currComp:Item}) {
    const { tags, currComp} = props;

    // const [currTheme, setTheme] = useState('vs-dark');
    const [preview, setPreview] = useState('')

    let compName;
    if(typeof currComp.value === 'string'){
        compName = (currComp.value).toLowerCase().replace(' ','-');
    }else{
        compName = (currComp.value);
    }

    const prefix = ['import { Component } from \'@angular/core\';\n','import { CommonModule } from \'@angular/common\';\n','@Component({\n', `  selector: \'${compName}\',\n`, '  standalone: true,\n','  imports: [CommonModule],\n', '  template: `\n'];
    const suffix = [`   \`\n`,`   styleUrls: [\'${compName}.component.css\']\n`,'})\n', `export class ${currComp.value}Component {\n','}\n`];

    // [{code: '<>'}, {code: '<>'}, {code: '<>'}]
    useEffect(() => {
        // console.log('preview tags:',tags);
        if(!tags.length){
            setPreview('// Drop components onto canvas to see code preview')
        }else{
            const canvasCodeArr = tags.map((ele) => `       ${ele.code}`);
            // console.log(canvasCodeArr);
            const finArr = prefix.concat(canvasCodeArr).concat(suffix);
            // console.log(finArr);
            setPreview(finArr.join(''));
        }
    }, [tags])


    const emptyText = '//drag items onto canvas to see code';

    return (
        <div className="flex-grow border-0 border-solid border-yellow-400">
            <Editor height="100%"
                defaultLanguage="javascript"
                defaultValue={emptyText}
                value={preview}
                // path={file.name}
                options={{
                    readOnly: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    // theme: `${currTheme}`,
                    wordWrap: 'off',
                    scrollbar: { vertical: 'hidden' },
                    scrollBeyondLastLine: false,
                    scrollBeyondLastColumn:0,
                    selectionHighlight: false,
                    occurrencesHighlight: false,
                    lineDecorationsWidth: 10,
                    selectOnLineNumbers: false,
                    lineNumbersMinChars: 3,
                    lineHeight: 20,
                    showUnused: false,
                    folding: false,
                    automaticLayout: true,
                }} />
        </div>
    )
};
