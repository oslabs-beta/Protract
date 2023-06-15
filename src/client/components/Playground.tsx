import React, { useState } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';

//export const ComponentContext = React.createContext(defaultValue: string)

export default function Playground() {
  //const [currComponent, setCurrComponent] = useState([`<div>`,`<span>`])

  return (
    <div className="flex flex-row border-solid border-4 border-green-600 h-1/2">
      {/* <ComponentContext.Provider value={currComponent}> */}
      <LeftColumn />
      <Canvas />
      <Preview />
      {/* </ComponentContext.Provider> */}
    </div>
  );
}
