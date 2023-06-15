import Editor from '@monaco-editor/react';
import { useState, useEffect, useContext } from 'react'
import { ComponentContext } from './ComponentContext'

export default function CodePreview(props: { tags: Object[] }) {
    const {tags} = props;
   
    // const [preview, setPreview] = useState(currComponent[0]/*'//typical code here'*/);
    const [currTheme, setTheme] = useState('vs-dark');
    const [windowWidth, setWindowWidth] = useState(`${window.innerWidth}`);
    const [preview, setPreview] = useState(tags);
    const [show, setShow] = useState('')
   

    // [{code: '<>'}, {code: '<>'}, {code: '<>'}]
    useEffect(() => {
        console.log('props.tags preview changes: ', preview);
        const strArr = props.tags.map((ele) => ele.code);
        setShow(strArr.join(''));
    }, [tags])
    

    const emptyText = '//drag items onto canvas to see code';
    
    //logs everytime parent item updates
    // useEffect(() =>{
    //     console.log('currComponent is:',currComponent);
    // },[currComponent])

    //hitting the button mutates the global component array
    // function changePreview (){
    //     setCurrComponent(prevComponent =>{
    //         // console.log('before',prevComponent);
    //         prevComponent.shift();
    //         // console.log('after',prevComponent)
    //         const newComp = [...prevComponent]
    //         if(newComp.length === 0){
    //             newComp.push(emptyText)
    //         }
    //         return newComp;
    //     });
        // setPreview(prevPreview => 
        //     prevPreview + `${currTheme}_ `
        // )
    // }

    return (
        <div className="flex-grow border-2 border-solid border-yellow-400">
            <Editor height="100%"
                defaultLanguage="javascript"
                defaultValue={emptyText}
                value={show}
                // path={file.name}
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