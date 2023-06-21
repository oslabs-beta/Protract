import React, {useContext, useRef, useState} from "react";
import ReactDOM from "react-dom";
import { PlaygroundContext } from "./Playground";

export default function SaveModal(props: {
  setProject: React.Dispatch<React.SetStateAction<string>>, 
  showModal: (string: string) => void, 
  handleCancel: () => void}) {

  const {setProject, showModal, handleCancel} = props;

  const {comps} = useContext(PlaygroundContext)

    const [input, setInput] = useState('');

  const modalRef= useRef<HTMLDivElement>(null);;
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleCancel();
    }
  }

  function handleChange(e: string) {
    setInput(e);
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      console.log(comps);
      setProject(input)
      showModal('')
    }
  }

  return ReactDOM.createPortal (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-40" ref={modalRef} onClick={(e) => closeModal(e)}>
        <div className="h-28 w-72 z-50 bg-white border-0 rounded text-center pt-4 ">Save this project as?
        <div className="m-4 space-x-8 ">
          <form onSubmit={(e) => handleSave(e)}>
            <input 
            className="flex-grow border border-red-700 rounded-md text-center text-l focus:outline-none"
            onChange={(e) => handleChange(e.target.value)} 
            value={input}></input>
            <button className="text-white bg-red-800 border-0 border-red-800 w-1/4 min-w-fit px-2 rounded" type="submit">Save</button>
            <button className="text-red-800 bg-white border-2 border-white w-1/4 min-w-fit rounded" onClick={() => handleCancel()}>Cancel</button>
          </form>
        </div>
        </div>
    </div>, 
        document.getElementById('portal') as Element
  )
}