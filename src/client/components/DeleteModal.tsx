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
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-30" ref={modalRef} onClick={(e) => closeModal(e)}>
        <div className="h-28 w-48 z-50 bg-white border-0 rounded text-center pt-4 ">Delete {value}?
        <div className="m-7 space-x-8 ">
          <button className="text-white bg-red-800 border-0 border-red-800 w-1/4 min-w-fit px-2 rounded" onClick={() => handleDelete()}>Yes</button>
          <button className="text-red-800 bg-white border-2 border-white w-1/4 min-w-fit rounded" onClick={() => handleCancel()}>No</button>
        </div>
        </div>
    </div>, 
        document.getElementById('portal') as Element
  )
}