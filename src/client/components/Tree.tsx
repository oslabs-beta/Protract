import React from 'react';
import { Component } from './dummyData';
import { PlaygroundContext } from "./Playground";
import { useContext } from "react";
import { Item, Comp } from '../../types';


interface TreeProps {
  comps: Comp|Item;
  depth?: number;
}

const Tree: React.FC<TreeProps> = ({ comps, depth = 0 }) => {

  const { currComp, setCurrComp, setChildren } = useContext(PlaygroundContext);

  console.log('in tree');
  console.log('comps', comps);
  console.log('currComp', currComp);

  function handleClick(comp) {
    setCurrComp(comp)
    // if (comp.children.length > 0) setChildren(comp.children);
    setChildren(comp.children)
    console.log('currComp in tree handleClick')
  }

  /**
   * This function recursively create a file directory-like tree
   *
   * @param {Type} currentComponent - the current
   * @returns {Type} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentComponent: Comp | Item, currentDepth: number) => {
    const { value, children } = currentComponent;
    console.log('currentComponent', currentComponent);

    return (
      <div className={`ml-${currentDepth * 4} flex flex-col items-center`}>
        {currentComponent.canEnter && (
          <div onClick={() => handleClick(currentComponent)} className="mt-4">
            <strong>{value}</strong>
          </div>
        )}

        {children && children.length > 0 && (
          <div className="flex flex-col items-center">
            {children.map((child, index) => (
              <div key={index} className="">
                <Tree comps={child} depth={currentDepth + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <>{renderTree(comps, depth)}</>;

};

export default Tree;
