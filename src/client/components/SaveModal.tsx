import React, { useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { PlaygroundContext } from './Playground';

export default function SaveModal(props: {
  setProject: React.Dispatch<React.SetStateAction<string>>;
  showModal: (string: string) => void;
  handleCancel: () => void;
}) {
  const { setProject, showModal, handleCancel } = props;

  const { user, comps } = useContext(PlaygroundContext);

  const [input, setInput] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleCancel();
    }
  };

  function handleChange(e: string) {
    setInput(e);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      console.log(user);
      console.log(comps);
      console.log(input);
      try {
        const data = await fetch('/proj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: input,
            root: comps,
            users: user,
          }),
        });
      } catch (err) {
        console.log(err);
      }
      setProject(input);
      showModal('');
    }
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      ref={modalRef}
      onClick={(e) => closeModal(e)}
    >
      <div className="z-50 h-28 w-72 rounded border-0 bg-white pt-4 text-center ">
        Save this project as?
        <div className="m-4 space-x-8 ">
          <form onSubmit={(e) => handleSave(e)}>
            <input
              className="text-l flex-grow rounded-md border border-red-700 text-center focus:outline-none"
              onChange={(e) => handleChange(e.target.value)}
              value={input}
            ></input>
            <button
              className="w-1/4 min-w-fit rounded border-0 border-red-800 bg-red-800 px-2 text-white"
              type="submit"
            >
              Save
            </button>
            <button
              className="w-1/4 min-w-fit rounded border-2 border-white bg-white text-red-800"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as Element
  );
}
