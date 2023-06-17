import React, { createContext, useEffect, useState } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import BankEl from './BankEl';
import { Item } from '../../types';

export const PlaygroundContext = createContext<{
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
}>({
  items: [],
  setItems: () => {},
})

export default function Playground() {

  // const [root, setRoot] = useState('app variable here'); // app is always the root
  // const [currentNode, setCurrentNode] = useState('app variable here') // currentNode always starts as app, then reassigns to the next component being worked on

  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [items, setItems] = useState<Item[]>([])
  const [currOrder, setCurrOrder] = useState<Item[]>([])
  
  const app = {value: 'app', codeStart: '<app>', codeEnd: '</app>', children: currOrder}

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

  function handleCanvasUpdate(arr: Item[])  {
    setCurrOrder(arr)
    console.log('currOrder in playground: ', currOrder);
  }

  const contextValue = {
    items,
    setItems
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
        tolerance: 100
      }
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  return (
    <div className="flex flex-row border-solid border-2 border-green-600 h-1/2">
      <PlaygroundContext.Provider value={contextValue}>
        <DndContext  
        sensors={sensors}
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}>
        <LeftColumn />
          <DragOverlay wrapperElement='ul'>
            {activeId  ? (
              <BankEl key={activeId} id={activeId}/>
            ): null}
          </DragOverlay>
          <Canvas items={items} handleCanvasUpdate={handleCanvasUpdate} />
        </DndContext>
        <Preview tags={currOrder}/>
      </PlaygroundContext.Provider>
    </div>
  );
}
