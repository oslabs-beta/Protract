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
import WarningModal from './Modals/WarningModal';
import SaveModal from './Modals/SaveModal';
import LoadModal from './Modals/LoadModal';
import zipFiles from '../helperFunctions/zipFiles';

export default function Canvas(props: {
  user: string;
  currComp: Item;
  handleCanvasUpdate: (arr: Item[]) => void;
  setChildren: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const { user, currComp, setChildren, handleCanvasUpdate } = props;
  const { setComps, comps, setCurrComp } = useContext(PlaygroundContext);

  // used for dndkit, notifies this component as a droppable area
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  // list is the display of the canvas, originally set to currComp.children
  const [list, setList] = useState<Item[]>(currComp.children);

  // different modals show up depending on which buttons were clicked
  const [modal, setModal] = useState('');

  // project title set if user decides to save a project
  const [project, setProject] = useState('');

  // array of projects available to user when they choose to load projects on an account
  const [projects, setProjects] = useState<Project[]>([]);

  // updates order of children for the current component in the object that contains all components
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

  // switches list when new currComp selected
  useEffect(() => {
    setList(currComp.children);
  }, [currComp]);

  // whenever list updates, tell parent what the order is now, and also call handleAppReorder
  useEffect(() => {
    handleCanvasUpdate(list);
    const updateApp = handleAppReorder(comps, currComp, list);
    setComps(updateApp);
  }, [list]);

  // function to reorder list items in the canvas
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

  // returns state of app back to default when user first visits site
  function handleReset() {
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

  // asks for a project name if the project doesnt have one yet, otherwise patches the project
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

  // loads the projects associated with the user
  async function handleLoad() {
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
      console.error('Failed to load projects');
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
      <div
        id="canvas"
        className="m-5 mx-10 flex flex-grow flex-col rounded-3xl border-4 border-dashed border-gray-400 bg-white"
      >
        <h2
          id="currCompTitle"
          className="my-6 text-center text-2xl font-semibold"
        >
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
