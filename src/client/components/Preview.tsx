import CodePreview from './CodePreview'
import Tree from './Tree'
import FlowTree from './FlowTree';
import { currentProject } from './dummyData';
import { Item } from './../../types';
import {useEffect, useState, useContext} from 'react';
import { PlaygroundContext } from "./Playground";

export default function Preview(props: { tags: Item[], currComp:Item}) {

  const { comps } = useContext(PlaygroundContext);

  const {tags, currComp} = props;

  const [display, setDisplay] = useState(<CodePreview tags = {tags} currComp={currComp}/>);
  const [tab, setTab] = useState('code')


  const handlePreviewClick = () => {
    if(tab !== 'code'){
      setTab('code');
      setDisplay(< CodePreview tags = {tags} currComp={currComp}/>);
    }
  }

  const handleTreeClick = () => {
    if(tab !== 'tree'){
      // console.log('switch to tree display!');
      setTab('tree');
      setDisplay(<FlowTree root={comps[0]}/>);
    }
  }

  useEffect(() => {
    if(tab === 'code'){
      setDisplay(<CodePreview tags = {tags} currComp={currComp}/>)
    }else if(tab === 'tree'){
      setDisplay(<FlowTree root={comps[0]}/>);
    }

  }, [tags])



  return (
    <div className="basis-1/4 border-l border-solid border-gray-200 flex flex-col">
      <div className ="flex flex-row ">
        <button className={tab === 'code' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handlePreviewClick}>Code Preview</button>
        <button className={tab === 'tree' ? 'previewBtnSelected' : 'previewBtn'} onClick = { handleTreeClick }>Component Tree</button>
      </div>
      { display }
    </div>
  );
}
