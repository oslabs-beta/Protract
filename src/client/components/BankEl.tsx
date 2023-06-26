import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import React from 'react';

export default function BankEl(props: {
  key: UniqueIdentifier;
  id: UniqueIdentifier;
}) {
  const { id } = props;

  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className=" my-2 min-w-full self-center rounded border border-red-700 bg-white p-2 text-center text-sm text-red-700 hover:bg-red-700 hover:text-white"
    >
      {id}
    </li>
  );
}
