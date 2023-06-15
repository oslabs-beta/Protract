import CodePreview from './CodePreview'
import Tree from './Tree'
import { currentProject } from './dummyData';
import { useState, useEffect } from 'react'

export default function Preview() {

  const [display, setDisplay] = useState(<CodePreview/>);
  const [tab, setTab] = useState('code')
  // useEffect((() => {
  //   if (state.display === 'preview') {

  //   }
  // }, [display])
  // )

  const handlePreviewClick = () => {
    console.log('switch to preview display!');
    setTab('code');
    setDisplay(<CodePreview/>);
  }

  const handleTreeClick = () => {
    console.log('switch to tree display!');
    setTab('tree');
    setDisplay(<Tree currentProject={currentProject}/>);
  }
  const toggleTab = (target: string) => {
    setTab(target);
  }


  return (
    <div className="basis-1/4 border-2 border-solid border-violet-700 flex flex-col">
      <div className ="flex flex-row">
        <button className={tab === 'code' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handlePreviewClick}>Code Preview</button>
        <button className={tab === 'tree' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handleTreeClick }>Component Tree</button>
      </div>
      { display }
    </div>
  );
}
