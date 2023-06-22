import ComponentBank from './ComponentBank';
import FileDirectory from './FileDirectory';
import { PlaygroundContext } from './Playground';
import { useContext } from 'react';

export default function LeftColumn() {
  
  const { comps } = useContext(PlaygroundContext);
  
  return (
    <div className="basis-1/4 flex flex-col border-r border-solid border-gray-200 ">
      <ComponentBank />
      <div>
      <h2 className="text-center my-1">File Directory</h2>
      <FileDirectory comps={comps[0]} depth={0}/>
      </div>
    </div>
  );
}
