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

  const { setItems, setCurrComp, setChildren } = useContext(PlaygroundContext);

  console.log('in tree');
  console.log('comps', comps);

  function handleClick(comp) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

  /**
   * This function recursively create a file directory-like tree
   *
   * @param {Type} currentComponent - the current
   * @returns {Type} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentComponent: Comp|Item) => {
    console.log('in renderTree (in Tree)');
    // console.log('currentProject', currentProject);
    console.log('currentComponent', currentComponent);
    // destructure current component's name and its children array
    const { value, children } = currentComponent;
    console.log('children destructured from currentLevel', children);
    console.log('value destructured', value);

    return (
      <div>
        {/*top margin needs to be increased*/}
        <div className={` border-l 'mt-2' ${depth > 0 ? 'ml-6': ''}`}>
          <strong>{value}</strong>
          {children && children.length > 0 && (
            <div>
              {children.map((child, index) => (
                <div key={index} className={`border-l`}>
                    <Tree comps={child} depth={depth + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
  <>
    <div>{renderTree(comps)}</div>
  </>

  );
};

export default Tree;
