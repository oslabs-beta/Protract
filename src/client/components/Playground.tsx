import React, { createContext, useEffect, useState, useMemo } from 'react'
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import BankEl from './BankEl';
import { Item } from '../../types';

export const PlaygroundContext = createContext<{
  comps: Item[],
  currComp: Item
  children: Item[],
  setComps: React.Dispatch<React.SetStateAction<Item[]>>,
  setCurrComp: React.Dispatch<React.SetStateAction<Item>>,
  setChildren: React.Dispatch<React.SetStateAction<Item[]>>
}>({
  comps: [],
  currComp: { value: 'app', id: 'app', codeStart: '<app>', codeEnd: '</app>', canEnter: true, children: [] },
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

const app: Item = { value: 'app', id: 'app', codeStart: '<app>', codeEnd: '</app>', canEnter: true, children }

  // whenever children changes, update the state of the currComp to match the changes
  useEffect(() => {
    setCurrComp((prevComp) => ({
      ...prevComp,
      children,
    }));
  }, [children]);


  // changes what component we are currently looking at
  const [currComp, setCurrComp] = useState<Item>(app);

  // custom components made in an instance
  const [comps, setComps] = useState<Item[]>([app])

  useEffect(() => {
    console.log('comps has updated in playground', comps);
  }, [comps])


  // update the root app component anytime a change is made, and changes are desired to persist
  function handleUpdateApp(comps: Item[], currComp: Item, newComp: Item): Item[] {
  return comps.map((comp) => {
    if (comp.id === currComp.id && comp.children) {
        comp.children.push(newComp);
    } else {
      comp.children = handleUpdateApp(comp.children, currComp, newComp);
    }
    return comp;
  });
}

  // everytime currComp updates and it isnt app, 
  // do setComps, find the comp in comps[0].children. change it to currComp.
  // if you cant find the comp, go into 

  // function to update order of items in instance
  function handleCanvasUpdate(arr: Item[])  {
    setCurrOrder(arr)
  }

  // used by playgroundcontext provider
  const contextValue = {
    comps,
    currComp,
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
      const newItem = { value: e.active.id, id: `${e.active.id}-${children.length}-in-${currComp.value}`, code: `<${e.active.id}></${e.active.id}>\n`, children: [] }
      setChildren((prev) => [...prev, newItem]);
      const updatedComp = handleUpdateApp(comps, currComp, newItem)
      setComps(updatedComp)
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
    <div className="h-full flex flex-row border-solid border-b border-gray-200">
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
