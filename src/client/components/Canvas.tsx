import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableBankEl from "./SortableBankEl"
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Comp, Item } from "../../types";

export default function Canvas(props: {currComp: Comp, items: Item[], handleCanvasUpdate: (arr: Item[]) => void, setCurrComp}) {
  const {setNodeRef} = useDroppable({
    id: 'canvas'
  })

  const { currComp, items, handleCanvasUpdate, setCurrComp } = props;

  const [list, setList] = useState<Item[]>(currComp.children)

useEffect(() => {
  setList(currComp.children);
}, [currComp]);

  useEffect(() => {
    handleCanvasUpdate(list)
  }, [list])

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      setList((list) => {
        const oldIndex = list.findIndex((item) => active.id === item.id)
        const newIndex = list.findIndex((item) => over.id === item.id)
        const updated = arrayMove(list, oldIndex, newIndex);
        setCurrComp((prev) => ({
          ...prev, children: updated
        }))
        return updated
      });
    }
  }

  return (
    <div className="basis-1/2 border-2 border-solid border-blue-600 flex flex-col  bg-gray-200">
      <div className="border-4 border-dotted m-6 mx-10 border-gray-400 rounded-3xl flex flex-col flex-grow bg-white">
        <h2 className="text-center my-6 font-semibold text-2xl" >{currComp.value}</h2>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={list.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
            <ul ref={setNodeRef} className="basis-1/2 border border-solid border-violet-600 flex-1 text-center">
              {list.map((item, index) => <SortableBankEl setList={setList} id={item.id} value={item.value}
                key={`${item}+${index}`} />)}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
