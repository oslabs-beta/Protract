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
    transition
  } = useSortable({id, 
    transition: {
    duration: 150, // milliseconds
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded">
      {value}
    </li>
  )
}