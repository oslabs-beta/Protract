import { UniqueIdentifier } from "@dnd-kit/core";
import React, {useRef} from "react";
import ReactDOM from "react-dom";

export default function DeleteModal(props: {value: UniqueIdentifier, handleDelete:() => void, handleCancel:() => void}) {

  const {value, handleDelete, handleCancel} = props;

  const modalRef= useRef<HTMLDivElement>(null);;
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleCancel();
    }
  }

  return ReactDOM.createPortal (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-gray-200 bg-opacity-50" ref={modalRef} onClick={(e) => closeModal(e)}>
        <div className="h-28 w-48 z-50 border-solid border-gray-800 bg-gray-400 border-2 rounded text-center pt-4 ">Delete {value}?
        <div className="m-7 space-x-8 ">
          <button className="bg-green-300 w-10 rounded" onClick={() => handleDelete()}>Yes</button>
          <button className="bg-red-300 w-10 rounded" onClick={() => handleCancel()}>No</button>
        </div>
        </div>
    </div>, 
        document.getElementById('portal') as Element
  )
}