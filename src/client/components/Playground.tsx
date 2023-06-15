import React, { useState } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import BankEl from './BankEl';

// export const ComponentContext = React.createContext(defaultValue: string)

export default function Playground() {

  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [items, setItems] = useState<Object[]>([])

  function handleDragStart(e: DragStartEvent) {
    console.log(e)
    setActiveId(e.active.id);
  }

  function handleDragMove(e: DragMoveEvent) {
  }

  function handleDragEnd(e: DragEndEvent) {
    console.log(e);
    if (e.over === null) return;
    if (e.over.id === 'canvas') {
      setItems((items) => [...items, { value: e.active.id, id: items.length }]);
    }
    setActiveId('');
  }

  // const [currComponent, setCurrComponent] = useState([`<div>`,`<span>`])

  return (
    <div className="flex flex-row border-solid border-4 border-green-600 h-1/2">
      <DndContext 
      onDragMove={handleDragMove} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}>
        {/* <ComponentContext.Provider value={currComponent}> */}
      <LeftColumn />
        <DragOverlay wrapperElement='ul'>
          {activeId  ? (
            <BankEl key={activeId} id={activeId}/>
          ): null}
        </DragOverlay>
        <Canvas items={items} />
      </DndContext>
      <Preview />
      {/* </ComponentContext.Provider> */}
    </div>
  );
}
