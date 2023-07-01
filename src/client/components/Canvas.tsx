import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableBankEl from './SortableBankEl';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useEffect, useState, useContext } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Item, Project } from '../../types';
import { PlaygroundContext } from './Playground';
import WarningModal from './WarningModal';
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';
import zipFiles from '../helperFunctions/zipFiles';

export default function Canvas(props: {
  user: string;
  currComp: Item;
  handleCanvasUpdate: (arr: Item[]) => void;
  setChildren: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const { user, currComp, setChildren, handleCanvasUpdate } = props;
  const { setComps, comps, setCurrComp } = useContext(PlaygroundContext);

  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const [list, setList] = useState<Item[]>(currComp.children);

  const [modal, setModal] = useState('');
  const [project, setProject] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  // handleUpdateApp(comps, currComp, newComp=currComp)
  function handleAppReorder(
    comps: Item[],
    currComp: Item,
    list: Item[]
  ): Item[] {
    return comps.map((comp) => {
      if (comp.id === currComp.id && comp.children) {
        comp.children = list;
      } else {
        comp.children = handleAppReorder(comp.children, currComp, list);
      }
      return comp;
    });
  }

  useEffect(() => {
    setList(currComp.children);
  }, [currComp]);

  useEffect(() => {
    handleCanvasUpdate(list);
    const updateApp = handleAppReorder(comps, currComp, list);
    setComps(updateApp);
  }, [list]);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      setList((list) => {
        const oldIndex = list.findIndex((item) => active.id === item.id);
        const newIndex = list.findIndex((item) => over.id === item.id);
        const updated = arrayMove(list, oldIndex, newIndex);
        // whenever order changes in an instance, update the children array
        // useeffect hooks for updating currComp and comps will run everytime children arr is updated as well
        setChildren(updated);
        return updated;
      });
    }
  }

  function handleCancel() {
    setModal('');
  }

  function handleReset() {
    //
    setComps([
      {
        value: 'app',
        id: 'app',
        codeStart: '<app>',
        codeEnd: '</app>',
        canEnter: true,
        children: [],
      },
    ]);
    setCurrComp({
      value: 'app',
      id: 'app',
      codeStart: '<app>',
      codeEnd: '</app>',
      canEnter: true,
      children: [],
    });
    setChildren([]);
    setModal('');
    setProject('');
  }

  async function saveProj(project: string) {
    // send a patch req to the backend, edit the collection where the name === project
    try {
      await fetch('/proj', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          project,
          root: comps,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  function checkIfNewProj() {
    if (project === '') {
      showModal('save');
    } else {
      saveProj(project);
    }
  }

  function showModal(string: string) {
    setModal(string);
  }

  async function handleLoad() {
    //send a request to backend including the user's name, expecting an array of objects, key is project name, value is the [{app}] assoc w the name
    //setProjects(data)
    try {
      const response = await fetch(`/proj/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        const data = await response.json();
        setProjects(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
    }
    setModal('load');
  }

  function handleExport() {
    zipFiles(comps[0]);
  }

  return (
    <div className="flex min-w-fit basis-1/2 flex-col border-0 border-solid  border-blue-600 bg-gray-200">
      <div className="ml-12 mr-7 mt-5 flex flex-row justify-between space-x-3 text-gray-500">
        <h1 className="text-xl font-bold">{project}</h1>
        <div className="flex space-x-3 justify-self-end text-gray-500">
          <button onClick={() => showModal('reset')}>New</button>
          <button onClick={() => checkIfNewProj()}>Save</button>
          <button onClick={() => handleLoad()}>Projects</button>
          <button onClick={() => handleExport()}>Export</button>
        </div>
      </div>
      <div id='canvas' className="m-5 mx-10 flex flex-grow flex-col rounded-3xl border-4 border-dashed border-gray-400 bg-white">
        <h2 id='currCompTitle' className="my-6 text-center text-2xl font-semibold">
          {currComp.value}
        </h2>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={list.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul
              aria-label="elements"
              ref={setNodeRef}
              className="flex-1 basis-1/2 border-t-0 border-solid border-gray-300 text-center"
            >
              {list.map((item, index) => (
                <SortableBankEl
                  id={item.id}
                  value={item.value}
                  key={`${item}+${index}`}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
      {modal === 'reset' && (
        <WarningModal handleCancel={handleCancel} handleReset={handleReset} />
      )}
      {modal === 'save' && (
        <SaveModal
          setProject={setProject}
          showModal={showModal}
          handleCancel={handleCancel}
        />
      )}
      {modal === 'load' && (
        <LoadModal
          user={user}
          project={project}
          handleReset={handleReset}
          handleCancel={handleCancel}
          projects={projects}
          setProject={setProject}
          setProjects={setProjects}
          showModal={showModal}
        />
      )}
    </div>
  );
}
