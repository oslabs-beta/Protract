import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";

export default function BankEl(props: { key: UniqueIdentifier, id: UniqueIdentifier }) {
  const { id } = props;

  const {
    attributes, 
    listeners, 
    setNodeRef, 
  } = useDraggable({id});

    return (
    <li ref={setNodeRef} {...listeners} {...attributes} className="min-w-max w-32 border border-red-700 my-2 mx-14 p-2 bg-white rounded text-red-700 hover:bg-red-700 hover:text-white text-sm text-center">
      {id}
    </li>
  );
}
