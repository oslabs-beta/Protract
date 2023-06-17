import React, { createContext, useEffect, useState } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import BankEl from './BankEl';

export const PlaygroundContext = createContext<{
  items: Object[],
  setItems: React.Dispatch<React.SetStateAction<Object[]>>,
}>({
  items: [],
  setItems: () => {},
})

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

  const contextValue = {
    items,
    setItems
  }
  
  // const [currComponent, setCurrComponent] = useState([`<div>`,`<span>`])

  return (
    <div className="flex flex-row border-solid border-2 border-green-600 h-1/2">
      <DndContext  
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}>
        < PlaygroundContext.Provider value={contextValue}>
        {/* <ComponentContext.Provider value={currComponent}> */}
      <LeftColumn />
        <DragOverlay wrapperElement='ul'>
          {activeId  ? (
            <BankEl key={activeId} id={activeId}/>
          ): null}
        </DragOverlay>
        <Canvas items={items} handleCanvasUpdate={handleCanvasUpdate} />
        </PlaygroundContext.Provider>
      </DndContext>
      <Preview tags={currOrder}/>
      {/* </ComponentContext.Provider> */}
    </div>
  );
}
