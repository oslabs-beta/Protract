import React, { useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { PlaygroundContext } from './Playground';
import { Project } from '../../types';

export default function LoadModal(props: {
  user: string;
  project: string;
  projects: Project[];
  handleReset: () => void;
  handleCancel: () => void;
  showModal: (string: string) => void;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  const [active, setActive] = useState('');
  const {
    user,
    project,
    projects,
    handleCancel,
    handleReset,
    showModal,
    setProject,
    setProjects,
  } = props;
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
      setProject(project.title);
    }
  }

  async function handleDelete() {
    if (active) {
      try {
        await fetch('/proj', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user,
            title: active,
          }),
        });
        setProjects((prev) =>
          prev.filter((project) => project.title !== active)
        );
        if (project === active) {
          handleReset();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      ref={modalRef}
      onClick={(e) => closeModal(e)}
    >
      <div className="z-50 flex w-52 flex-col rounded border-0 bg-white py-4 text-center">
        <div className="flex-grow">
          Projects
          <div className="m-7 space-x-8 overflow-y-auto">
            <ul>
              {projects.map((project, i) => (
                <li
                  key={i}
                  onClick={() => handleActive(project.title)}
                  className={
                    active === project.title ? 'rounded-md bg-gray-200' : ''
                  }
                >
                  {project.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" flex justify-center space-x-3">
          <button
            className="w-1/4 min-w-fit rounded border-0 border-red-800 bg-red-800 px-2 text-white"
            onClick={() => handleLoad()}
          >
            Load
          </button>
          <button
            className="w-1/4 min-w-fit rounded border-0 border-red-800 bg-red-800 px-2 text-white"
            onClick={() => handleDelete()}
          >
            Delete
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
