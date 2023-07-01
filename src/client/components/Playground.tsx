import React, { createContext, useEffect, useState, useMemo } from 'react';
import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import BankEl from './BankEl';
import { Item } from '../../types';
import Navbar from './Navbar';

export const PlaygroundContext = createContext<{
  comps: Item[];
  currComp: Item;
  children: Item[];
  setComps: React.Dispatch<React.SetStateAction<Item[]>>;
  setCurrComp: React.Dispatch<React.SetStateAction<Item>>;
  setChildren: React.Dispatch<React.SetStateAction<Item[]>>;
  handleUpdateApp(comps: Item[], currComp: Item, newComp: Item): Item[];
  user: string;
}>({
  comps: [],
  currComp: {
    value: 'app',
    id: 'app',
    codeStart: '<app>',
    codeEnd: '</app>',
    canEnter: true,
    children: [],
  },
  children: [],
  setCurrComp: () => {},
  setComps: () => {},
  setChildren: () => {},
  handleUpdateApp: () => [],
  user: '',
});

export default function Playground() {
  //user session
  const [user, setUser] = useState('');
  // used for drag overlay
  const [activeId, setActiveId] = useState<UniqueIdentifier>('');

  // chronological order of items made in an instance
  // const [items, setItems] = useState<Item[]>([]);

  // updated order received from canvas when items are moved
  const [currOrder, setCurrOrder] = useState<Item[]>([]);

  const [children, setChildren] = useState<Item[]>([]);

  const app: Item = {
    value: 'app',
    id: 'app',
    codeStart: '<app>',
    codeEnd: '</app>',
    canEnter: true,
    children,
  };

  // whenever children changes, update the state of the currComp to match the changes
  useEffect(() => {
    setCurrComp((prevComp) => ({
      ...prevComp,
      children,
    }));
  }, [children]);

  // changes what component we are currently looking at
  const [currComp, setCurrComp] = useState<Item>(app);

  // comps is an array that holds app, the root object of a project
  const [comps, setComps] = useState<Item[]>([app]);
  console.log(comps);

  // update the root app component anytime a change is made, and changes are desired to persist
  function handleUpdateApp(
    comps: Item[],
    currComp: Item,
    newComp: Item
  ): Item[] {
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
  function handleCanvasUpdate(arr: Item[]) {
    setCurrOrder(arr);
  }

  // used by playgroundcontext provider
  const contextValue = {
    user,
    comps,
    currComp,
    children,
    setComps,
    setCurrComp,
    setChildren,
    handleUpdateApp,
  };

  // drag and drop logic
  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }

  function handleDragEnd(e: DragEndEvent) {
    if (e.over === null) return;
    if (e.over.id === 'canvas') {
      const newItem = {
        value: e.active.id,
        id: `${e.active.id}-${children.length}-in-${currComp.value}`,
        code: `<${e.active.id}></${e.active.id}>\n`,
        children: [],
      };
      setChildren((prev) => [...prev, newItem]);
      const updatedComp = handleUpdateApp(comps, currComp, newItem);
      setComps(updatedComp);
    }
    setActiveId('');
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
        tolerance: 100,
      },
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="flex h-full flex-row border-b border-solid border-gray-200">
        <PlaygroundContext.Provider value={contextValue}>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <LeftColumn />
            <DragOverlay wrapperElement="ul">
              {activeId ? <BankEl key={activeId} id={activeId} /> : null}
            </DragOverlay>
            <Canvas
              user={user}
              currComp={currComp}
              setChildren={setChildren}
              handleCanvasUpdate={handleCanvasUpdate}
            />
          </DndContext>
          <Preview tags={currOrder} currComp={currComp} />
        </PlaygroundContext.Provider>
      </div>
    </>
  );
}
