import Editor from '@monaco-editor/react';


export default function CodePreview() {
    const previewVal = `import { Component } from '@angular/core';

@Component({
  selector: {'app-hero-detail','app-hero-detail','app-hero-detail'}
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

}`


    return (
        <div>
            <Editor height= '50vh'
                defaultLanguage="javascript"
                defaultValue="// some exmample comment"
                value={previewVal}
                options={{
                    readOnly: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    theme: 'vs-dark',
                    wordWrap: 'off',
                    scrollbar: { vertical: 'hidden' },
                    scrollBeyondLastLine: false,
                    selectionHighlight: false,
                    occurrencesHighlight: false,
                    lineDecorationsWidth: 2,
                    selectOnLineNumbers:false,
                    lineNumbersMinChars:3,
                    lineHeight:20
                }} />
        </div>
    )
};