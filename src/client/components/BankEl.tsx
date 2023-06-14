import { useDraggable, useDroppable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities'

export default function BankEl(props: { key: string, value: string, id: string }) {
  const { value, id } = props;

  const {
    attributes, 
    listeners, 
    setNodeRef, 
    transform
  } = useDraggable({id});

  const style={transform: CSS.Translate.toString(transform)}

    return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded">
      {value}
    </li>
  );
}
