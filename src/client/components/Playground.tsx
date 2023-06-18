import React, { createContext, useEffect, useState, useMemo } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import BankEl from './BankEl';
import { Item, Comp } from '../../types';

export const PlaygroundContext = createContext<{
  comps: Comp[],
  children: Item[],
  setComps: React.Dispatch<React.SetStateAction<Comp[]>>,
  setCurrComp: React.Dispatch<React.SetStateAction<Comp>>,
  setChildren: React.Dispatch<React.SetStateAction<Item[]>>
}>({
  comps: [],
  children: [],
  setCurrComp: () => {},
  setComps: () => {},
  setChildren: () => {}
})

export default function Playground() {

  // used for drag overlay
  const [activeId, setActiveId] = useState<UniqueIdentifier>('');

  // chronological order of items made in an instance
  // const [items, setItems] = useState<Item[]>([]);

  // updated order received from canvas when items are moved
  const [currOrder, setCurrOrder] = useState<Item[]>([]);

  const [children, setChildren] = useState<Item[]>([]);
  
const app: Comp = { value: 'app', id: 'app', codeStart: '<app>', codeEnd: '</app>', canEnter: true, children }

  // whenever children changes, update the state of the currComp to match the changes
  useEffect(() => {
    setCurrComp((prevComp) => ({
      ...prevComp,
      children,
    }));
  }, [children]);


  // changes what component we are currently looking at
  const [currComp, setCurrComp] = useState<Comp>(app);

  // custom components made in an instance
  const [comps, setComps] = useState<Comp[]>([app])
  
  // whenever children changes, change the children property of the comp that matches currComps id
  useEffect(() => {
    setComps((prevComps) =>
      prevComps.map((comp) => {
        if (comp.id === currComp.id) {
          return {
            ...comp,
            children,
          };
        }
        return comp;
      })
    );
  }, [children]);

  // function to update order of items in instance
  function handleCanvasUpdate(arr: Item[])  {
    setCurrOrder(arr)
  }

  // used by playgroundcontext provider
  const contextValue = {
    comps,
    children,
    setComps,
    setCurrComp,
    setChildren
  }

  // drag and drop logic
  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }

  function handleDragEnd(e: DragEndEvent) {
    if (e.over === null) return;
    if (e.over.id === 'canvas') {
      const newItem = { value: e.active.id, id: `${e.active.id}-${children.length}-in-${currComp.value}`, code: `<${e.active.id}></${e.active.id}>\n` }
      setChildren((prev) => [...prev, newItem]);
    }
    setActiveId('');
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
          <Canvas currComp={currComp} setChildren={setChildren} handleCanvasUpdate={handleCanvasUpdate} />
        </DndContext>
        <Preview tags={currOrder}/>
      </PlaygroundContext.Provider>
    </div>
  );
}
