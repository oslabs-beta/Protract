import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';
import { DndContext } from '@dnd-kit/core';

export default function Playground() {

  function handleDragMove(e) {
    console.log(e.activatorEvent.srcElement.innerText);
  }


  return (
    <div className="flex flex-row border-solid border-2 border-green-600 h-1/2">
      <DndContext onDragMove={handleDragMove}>
        <LeftColumn />
        <Canvas />
      </DndContext>
      <Preview />
    </div>
  );
}
