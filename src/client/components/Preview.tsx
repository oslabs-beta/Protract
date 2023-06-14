import CodePreview from './CodePreview'
import Tree from './Tree'
import { currentProject } from './dummyData';
import { useState, useEffect } from 'react'

export default function Preview() {

  const [display, setDisplay] = useState(<CodePreview/>);

  // useEffect((() => {
  //   if (state.display === 'preview') {

  //   }
  // }, [display])
  // )

  const handlePreviewClick = () => {
    console.log('switch to preview display!');
    setDisplay(<CodePreview/>);
  }

  const handleTreeClick = () => {
    console.log('switch to tree display!');
    setDisplay(<Tree root={currentProject}/>);
  }


  return (
    <div className="basis-1/4 border-2 border-solid border-violet-700 flex flex-col">
      <div className ="flex flex-row">
        <button className="basis-1/2 border-2 border-solid border-black" onClick = { handlePreviewClick } >Code Preview</button>
        <button className="basis-1/2 border-2 border-solid border-black" onClick = { handleTreeClick }>Component Tree</button>
      </div>

      { display }
    </div>
  );
}
