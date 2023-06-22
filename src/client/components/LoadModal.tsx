import React, { useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { PlaygroundContext } from './Playground';

export default function LoadModal(props: {
  handleCancel: () => void;
  projects: object[];
  showModal: (string: string) => void;
}) {
  const [active, setActive] = useState('');
  const { handleCancel, projects, showModal } = props;
  const { setComps, setChildren, setCurrComp } = useContext(PlaygroundContext);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handleCancel();
    }
  };

  function handleActive(string: string) {
    setActive(string);
  }

  function handleLoad() {
    if (active) {
      const project = projects.filter((project) => project.title === active)[0];
      setComps(project.root);
      setCurrComp(project.root[0]);
      setChildren(project.root[0].children);
      showModal('');
    }
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      ref={modalRef}
      onClick={(e) => closeModal(e)}
    >
      <div className="z-50 h-28 w-48 rounded border-0 bg-white pt-4 text-center ">
        Projects
        <div className="m-7 space-x-8 ">
          <ul>
            {projects.map((project, i) => (
              <li
                key={i}
                onClick={() => handleActive(project.title)}
                className={active === project.title ? 'bg-blue-500' : ''}
              >
                {project.title}
              </li>
            ))}
          </ul>
          <button
            className="w-1/4 min-w-fit rounded border-0 border-red-800 bg-red-800 px-2 text-white"
            onClick={() => handleLoad()}
          >
            Load
          </button>
          <button
            className="w-1/4 min-w-fit rounded border-2 border-white bg-white text-red-800"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as Element
  );
}
