import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableBankEl from "./SortableBankEl"
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Canvas(props: {items: Object[], handleCanvasUpdate: (arr: Object[]) => void}) {
  const {setNodeRef} = useDroppable({
    id: 'canvas'
  })

  const {items, handleCanvasUpdate} = props;

  const [list, setList] = useState<Object[]>(items)

  useEffect(() => {
    if (items.length > 0)
    setList(list.concat(items[items.length-1]))
  }, [items])

  useEffect(() => {
    handleCanvasUpdate(list)
  }, [list])

  function handleDragEnd(e: DragEndEvent) {
    const {active, over} = e;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      setList((list) => {
        const oldIndex = list.findIndex((item) => active.id === item.id)
        const newIndex = list.findIndex((item) => over.id === item.id)
        return arrayMove(list, oldIndex, newIndex);
      });
  }
}

  return (
    <div className="basis-1/2 border-2 border-solid border-red-600 flex flex-col">
      <h2 className="text-center my-1.5 font-semibold" >Current component</h2>
      <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={list.map(item => item.id)}
      strategy={verticalListSortingStrategy}>
    <ul ref={setNodeRef} className="basis-1/2 border-2 border-solid border-red-600 flex-1 ">
    {list.map((item, index) => <SortableBankEl setList={setList} id={item.id} value={item.value}
    key={`${item}+${index}`}/> )}
    </ul>
    </SortableContext>
    </DndContext>
    </div>
  );
}
