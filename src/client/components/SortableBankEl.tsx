import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import React, { useContext } from 'react';
import { PlaygroundContext } from './Playground';

export default function SortableBankEl(props: {
  id: UniqueIdentifier;
  value: UniqueIdentifier;
}) {
  const [deleteModal, setDeleteModal] = useState(false);

  const { id, value } = props;
  const { setComps, setChildren } = useContext(PlaygroundContext);

  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  function handleClick() {
    setDeleteModal(true);
    console.log(deleteModal);
  }

  function handleDelete() {
    setDeleteModal(false);
    // remove the comp if it is a comp
    //  TODO, update comps so that if the deleted comp had comps in its children, those comps are deleted as well
    setComps((prev) => prev.filter((comp) => comp.id !== id));
    // remove the el from the children arr
    setChildren((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCancel() {
    setDeleteModal(false);
    return;
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mx-10 my-5 rounded border border-black bg-white p-2 shadow-md"
      >
        {value}
        <button
          className="float-right mr-3 rounded-sm bg-white px-1 text-red-700"
          onMouseDown={() => handleClick()}
        >
          X
        </button>
      </li>
      {deleteModal && (
        <DeleteModal
          value={value}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
}
