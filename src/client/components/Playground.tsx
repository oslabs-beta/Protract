import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import BankEl from './BankEl';

export default function Playground() {

  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [items, setItems] = useState<UniqueIdentifier[]>([])

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
      setItems((items) => [...items, e.active.id]);
      console.log(items);
    }
    setActiveId('');
  }

  return (
    <div className="flex flex-row border-solid border-2 border-green-600 h-1/2">
      <DndContext 
      onDragMove={handleDragMove} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}>
        <LeftColumn />
        <DragOverlay wrapperElement='ul'>
          {activeId  ? (
            <BankEl key={activeId} id={activeId}/>
          ): null}
        </DragOverlay>
        <Canvas items={items} />
      </DndContext>
      <Preview />
    </div>
  );
}
