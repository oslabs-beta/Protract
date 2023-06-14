import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableBankEl from "./SortableBankEl"
import { DndContext, DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";



export default function Canvas(props: {items: UniqueIdentifier[]}) {

  const {setNodeRef} = useDroppable({
    id: 'canvas'
  })

  const {items} = props;

  const [list, setList] = useState<UniqueIdentifier[]>(items)

  useEffect(() => {
    if (items.length > 0)
    setList(list.concat(items[items.length-1]))
  }, [items])

  function handleDragStart(e: DragStartEvent) {
    console.log(e.active.id)
  }

  function handleDragEnd(e: DragEndEvent) {
    const {active, over} = e;
    console.log(active)
    console.log(over)
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      setList((list) => {
        const oldIndex = list.indexOf(active.id);
        const newIndex = list.indexOf(over.id);
        console.log(arrayMove(list, oldIndex, newIndex))
        return arrayMove(list, oldIndex, newIndex);
      });
  }
}

  return (
    <div className="basis-1/2 border-2 border-solid border-red-600 flex flex-col">
      <h2 className="text-center my-1.5 font-semibold" >Current component</h2>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={items}
      strategy={verticalListSortingStrategy}>
    <ul ref={setNodeRef} className="basis-1/2 border-2 border-solid border-red-600 flex-1">
    {list.map((item, index) => <SortableBankEl id={item} value={item}
    key={`${item}+${index}`}/> )}
    </ul>
    </SortableContext>
    </DndContext>
    </div>
  );
}
