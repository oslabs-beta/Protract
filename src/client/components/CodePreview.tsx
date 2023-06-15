import Editor from '@monaco-editor/react';
import { useState, useEffect, useContext } from 'react'
import { ComponentContext } from './ComponentContext'

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
    // const currFile = files[fileName];

    //Pull the value from parent Context
    const {currComponent, setCurrComponent} = useContext(ComponentContext);


    // const [preview, setPreview] = useState(currComponent[0]/*'//typical code here'*/);
    const [currTheme, setTheme] = useState('vs-dark');
    const [windowWidth, setWindowWidth] = useState(`${window.innerWidth}`);

    const emptyText = '//drag items onto canvas to see code';
    
    //Effect will only run when initial rendered
    useEffect(() =>{
        console.log('onMount');
    }, [])

    //Function called whenever resizing occurs
    function resizeEvent(){
        setWindowWidth(`${window.innerWidth}`)
    };

    //event listener example
    useEffect(() =>{
        addEventListener('resize', resizeEvent)
        return () => {
            console.log('cleanup occured');
            //console.log(msg);
            window.removeEventListener('resize',resizeEvent)
        }
    },[])

    //logs everytime parent item updates
    useEffect(() =>{
        console.log('currComponent is:',currComponent);
    },[currComponent])

    //hitting the button mutates the global component array
    function changePreview (){
        setCurrComponent(prevComponent =>{
            // console.log('before',prevComponent);
            prevComponent.shift();
            // console.log('after',prevComponent)
            const newComp = [...prevComponent]
            if(newComp.length === 0){
                newComp.push(emptyText)
            }
            return newComp;
        });
        // setPreview(prevPreview => 
        //     prevPreview + `${currTheme}_ `
        // )
    }
    
    //hitting button changes the theme
    function changeTheme(){
        let newTheme;
        currTheme === 'light' ? newTheme = 'vs-dark' : newTheme = 'light'; 
        setTheme(newTheme)
    }

    return (
        <div className="flex-grow border-2 border-solid border-yellow-400">
            {/* <button className="border-4 border-indigo-600" onClick={changePreview}>addText</button> */}
            {/* <button className="border-4 border-amber-500" onClick={changeTheme}>theme</button> */}
            <Editor height="100%"
                defaultLanguage="javascript"
                defaultValue={emptyText}
                // value={currComponent[0]}
                value = {windowWidth}
                // path={file.name}
                // defaultLanguage={file.language}
                // value={file.value}
                options={{
                    readOnly: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    theme: `${currTheme}`,
                    wordWrap: 'on',
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