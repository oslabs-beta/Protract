import Editor from '@monaco-editor/react';
import { useState, useEffect, useContext } from 'react';
import {Item} from './../../types'
//import { ComponentContext } from './ComponentContext'

export default function CodePreview(props: { tags: Item[] }) {
    const { tags } = props;

    // const [currTheme, setTheme] = useState('vs-dark');
    const [preview, setPreview] = useState(tags);
    const [show, setShow] = useState('')


    // [{code: '<>'}, {code: '<>'}, {code: '<>'}]
    useEffect(() => {
        const strArr = props.tags.map((ele) => ele.code);
        setShow(strArr.join(''));
    }, [tags])


    const emptyText = '//drag items onto canvas to see code';

    return (
        <div className="flex-grow border-0 border-solid border-yellow-400">
            <Editor height="100%"
                defaultLanguage="javascript"
                defaultValue={emptyText}
                value={show}
                // path={file.name}
                options={{
                    readOnly: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    // theme: `${currTheme}`,
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