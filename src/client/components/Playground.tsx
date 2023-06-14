import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import BankEl from './BankEl';

export default function Playground() {

  const [activeId, setActiveId] = useState<UniqueIdentifier>('');

  function handleDragStart(e: DragStartEvent) {
    console.log(e)
    setActiveId(e.active.id);
  }

  function handleDragMove(e: DragMoveEvent) {
    console.log('moving');
  }

  function handleDragEnd() {
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
          {activeId ? (
            <BankEl key={activeId} id={activeId}/>
          ): null}
        </DragOverlay>
        <Canvas />
      </DndContext>
      <Preview />
    </div>
  );
}
