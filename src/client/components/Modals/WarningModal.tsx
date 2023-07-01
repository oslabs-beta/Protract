import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

export default function WarningModal(props: {
  handleCancel: () => void;
  handleReset: () => void;
}) {
  const { handleCancel, handleReset } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleCancel();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      ref={modalRef}
      onClick={(e) => closeModal(e)}
    >
      <div
        id="warningModal"
        className="z-50 h-28 w-48 rounded border-0 bg-white pt-4 text-center "
      >
        Start a new project?
        <div className="m-7 space-x-8 ">
          <button
            className="w-1/4 min-w-fit rounded border-0 border-red-800 bg-red-800 px-2 text-white"
            onClick={() => handleReset()}
          >
            Yes
          </button>
          <button
            className="w-1/4 min-w-fit rounded border-2 border-white bg-white text-red-800"
            onClick={() => handleCancel()}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as Element
  );
}
