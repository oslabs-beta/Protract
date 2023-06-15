import React, { createContext, useEffect, useState } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import BankEl from './BankEl';
import { ComponentContext } from './ComponentContext';



export default function Playground() {

  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [items, setItems] = useState<Object[]>([])
  const [currOrder, setCurrOrder] = useState<Object[]>([])

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }

  function handleDragEnd(e: DragEndEvent) {
    if (e.over === null) return;
    if (e.over.id === 'canvas') {
      setItems((items) => [...items, { value: e.active.id, id: `${e.active.id}-${items.length}`, code: `<${e.active.id}></${e.active.id}>\n` }]);
    }
    setActiveId('');
  }

  function handleCanvasUpdate(arr: Object[])  {
    setCurrOrder(arr)
    console.log('currOrder in playground: ', currOrder);
  }

  // const [currComponent, setCurrComponent] = useState([`<div>`,`<span>`])

  return (
    <div className="flex flex-row border-solid border-4 border-green-600 h-1/2">
      <DndContext  
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}>
        {/* <ComponentContext.Provider value={currComponent}> */}
      <LeftColumn />
        <DragOverlay wrapperElement='ul'>
          {activeId  ? (
            <BankEl key={activeId} id={activeId}/>
          ): null}
        </DragOverlay>
        <Canvas items={items} handleCanvasUpdate={handleCanvasUpdate} />
      </DndContext>
      <Preview tags={currOrder}/>
      {/* </ComponentContext.Provider> */}
    </div>
  );
}
