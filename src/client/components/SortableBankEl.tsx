import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableBankEl(props: {id: UniqueIdentifier, value: UniqueIdentifier}) {
  const {id, value} = props;

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

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded">
      {value}
    </li>
  )
}