import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Item } from "../../types";
// import { useContext } from "react";
// import { PlaygroundContext } from "./Playground";

export default function SortableBankEl(props: { setList: React.Dispatch<React.SetStateAction<Item[]>>, id: UniqueIdentifier, value: UniqueIdentifier}) {

  const [deleteModal, setDeleteModal] = useState(false);

  const {id, value, setList} = props;
  // const {comps, setComps} = useContext(PlaygroundContext);

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
    console.log('clicked');
    setDeleteModal(true);
    console.log(deleteModal);
  }

function handleDelete() {
  setDeleteModal(false);
  // need logic here to remove the li from file directory
    setList((prevList) => {
      return prevList.filter((item) => item.id !== id);
    });
}

function handleCancel() {
  setDeleteModal(false);
  return;
}

  return (
    <>
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="border border-black my-5 p-2 bg-white mx-10 shadow-md rounded">
      {value}
      <button className="bg-gray-400 text-red-700 float-right mr-3 px-1 rounded-sm" onMouseDown={() => handleClick()} >X</button>
    </li>
      {deleteModal &&
        <DeleteModal value={value} handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </>
  )
}