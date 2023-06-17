import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";

export default function BankEl(props: { key: UniqueIdentifier, id: UniqueIdentifier }) {
  const { id } = props;

  const {
    attributes, 
    listeners, 
    setNodeRef, 
  } = useDraggable({id});

    return (
    <li ref={setNodeRef} {...listeners} {...attributes} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded text-center">
      {id}
    </li>
  );
}
