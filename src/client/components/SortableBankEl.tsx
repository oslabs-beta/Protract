import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableBankEl(props: { setList: React.Dispatch<React.SetStateAction<Object[]>>, id: UniqueIdentifier, value: UniqueIdentifier}) {


  const {id, value, setList} = props;

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
  setList((prevList) => {
    const index = prevList.findIndex((item) => item.id === id);
    const newList = [...prevList];
    newList.splice(index, 1);
    return newList;
  });
}

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded">
      {value}
      <button className="bg-gray-400 text-red-700 float-right mr-3 px-1 rounded-sm" onMouseDown={(e) => handleClick()} >X</button>
    </li>
  )
}