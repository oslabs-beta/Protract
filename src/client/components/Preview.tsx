import CodePreview from './CodePreview'
import Tree from './Tree'
import { currentProject } from './dummyData';
import { Item } from './../../types';
import {useEffect, useState, useContext} from 'react';
import { PlaygroundContext } from "./Playground";

export default function Preview(props: { tags: Item[] }) {

  const { comps } = useContext(PlaygroundContext);

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
      // console.log('switch to preview display!');
      // console.log('destructured tags in preview', tags);
      setTab('code');
      setDisplay(< CodePreview tags = {tags}/>);
    }
  }
  const handleTreeClick = () => {
    if(tab !== 'tree'){
      // console.log('switch to tree display!');
      setTab('tree');
      setDisplay(<Tree root={comps[0]}/>);
    }
  }

  useEffect(() => {
    if(tab === 'code'){
      setDisplay(<CodePreview tags = {tags}/>)
    }else if(tab === 'tree'){
      console.log('rendering tree from Preview');
      setDisplay(<Tree root={comps[0]}/>);
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
