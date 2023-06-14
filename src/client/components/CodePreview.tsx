import Editor from '@monaco-editor/react';
import { useState, useEffect } from 'react'

export default function CodePreview() {
    const previewVal = `import { Component } from '@angular/core';

@Component({
    selector: {'app-hero-detail','app-hero-detail','app-hero-detail'}
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
}`

    // const files = {
    //     "script.py":{
    //         name:"script.py",
    //         language:"javascript",
    //         value:"//Here is some javascript text"
    //     },
    // }
    // const [fileName,setFileName] = useState("script.py");
    // const file = files[fileName];


    // const [state, setState] = useState({preview:'//code preview here', color:'red'})
    // const preview = state.preview;
    // const color = state.color;
    // console.log(state);
    const [preview, setPreview] = useState('//typical code here');
    const [currTheme, setTheme] = useState('vs-dark');
    const [windowWidth, setWindowWidth] = useState(`${window.innerWidth}`);


    useEffect(() =>{
        console.log('onMount');
    }, [])

    function resizeEvent(){
        setWindowWidth(`${window.innerWidth}`)
    };

    useEffect(() =>{
        addEventListener('resize', resizeEvent)
        return () => {
            console.log('cleanup occured');
            window.removeEventListener('resize',resizeEvent)
        }
    })

    useEffect(() =>{
        console.log('text render');
    }, [preview])

    useEffect(() =>{
        console.log('theme render');
    }, [currTheme])

    function changePreview() {
        setPreview(prevPreview => 
            prevPreview + ` ${currTheme}`
        )
    }
    function changeTheme(){
        let newTheme;
        currTheme === 'light' ? newTheme = 'vs-dark' : newTheme = 'light'; 
        setTheme(newTheme)
    }

    return (
        <div className="flex-grow border-2 border-solid border-yellow-400">
            <button onClick={changePreview}>addText</button>
            <button onClick={changeTheme}>theme</button>
            <Editor height="50vh"
                defaultLanguage="javascript"
                // value={preview}
                value = {windowWidth}
                // path={file.name}
                // defaultLanguage={file.language}
                // value={file.value}
                options={{
                    readOnly: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    theme: `${currTheme}`,
                    wordWrap: 'off',
                    scrollbar: { vertical: 'hidden' },
                    scrollBeyondLastLine: false,
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