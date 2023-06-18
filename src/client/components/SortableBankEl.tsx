import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Item } from "../../types";
import { useContext } from "react";
import { PlaygroundContext } from "./Playground";

export default function SortableBankEl(props: { id: UniqueIdentifier, value: UniqueIdentifier}) {

  const [deleteModal, setDeleteModal] = useState(false);

  const {id, value} = props;
  const { setComps, setChildren} = useContext(PlaygroundContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({id, 
    })

  const style = {
    transform: CSS.Transform.toString(transform),
  }

  function handleClick() {
    setDeleteModal(true);
    console.log(deleteModal);
  }

function handleDelete() {
  setDeleteModal(false);
    // remove the comp if it is a comp
    setComps((prev) => prev.filter((comp) => comp.id !== id))
    // remove the el from the children arr
    setChildren((prev) => prev.filter((item) => item.id !== id))
}

function handleCancel() {
  setDeleteModal(false);
  return;
}

  return (
    <>
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="border border-black my-5 p-2 bg-white mx-10 shadow-md rounded">
      {value}
      <button className="bg-white text-red-700 float-right mr-3 px-1 rounded-sm" onMouseDown={() => handleClick()} >X</button>
    </li>
      {deleteModal &&
        <DeleteModal value={value} handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </>
  )
}