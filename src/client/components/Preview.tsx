import CodePreview from './CodePreview'
import Tree from './Tree'
import { currentProject } from './dummyData';
import { Item } from './../../types';
import {useEffect, useState} from 'react';

export default function Preview(props: { tags: Item[] }) {

  const {tags} = props;

  const [display, setDisplay] = useState(<CodePreview tags = {tags}/>);
  const [tab, setTab] = useState('code')
  // useEffect((() => {
  //   if (state.display === 'preview') {

  //   }
  // }, [display])
  // )

  const handlePreviewClick = () => {
    if(tab !== 'code'){
      console.log('switch to preview display!');
      console.log('destructured tags in preview', tags);
      setTab('code');
      setDisplay(< CodePreview tags = {tags}/>);
    }
  }
  const handleTreeClick = () => {
    if(tab !== 'tree'){
      console.log('switch to tree display!');
      setTab('tree');
      setDisplay(<Tree currentProject={currentProject}/>);
    }
  }
  
  useEffect(() => {
    if(tab === 'code'){
      setDisplay(<CodePreview tags = {tags}/>)
    }else if(tab === 'tree'){
      setDisplay(<Tree currentProject={currentProject}/>);
    }
    
  }, [tags])



  return (
    <div className="basis-1/4 border-2 border-solid border-violet-700 flex flex-col bg-gray-100">
      <div className ="flex flex-row">
        <button className={tab === 'code' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handlePreviewClick}>Code Preview</button>
        <button className={tab === 'tree' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handleTreeClick }>Component Tree</button>
      </div>
      { display }
    </div>
  );
}
