import React from 'react';
// import { Component } from './dummyData';
import { Item, Comp } from '../../types';

interface TreeProps {
  comps: Comp | Item;
  depth?: number;
}

const Tree: React.FC<TreeProps> = ({ comps, depth = 0 }) => {

  /**
   * This function recursively create a file directory-like tree
   *
   * @param {Type} currentComponent - the current
   * @returns {Type} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentLevel: Comp | Item) => {
    console.log(currentLevel);
    // create an array of the current level's node names
    const currentNodeNames = Object.keys(currentLevel);

    return (
      <div className={`ml-${currentDepth * 4} flex flex-col items-center`}>
        <div onClick={() => handleClick(currentComponent)}>
          <strong>{value}</strong>
        </div>
        {children && children.length > 0 && (
          <div className="flex flex-col items-center">
            {children.map((child, index) => (
              <div key={index} className="mt-2">
                <Tree comps={child} depth={currentDepth + 1} />
              </div>
              <div>
                {/* Recursively create a new Tree component, increasing depth each time */}
                {children.map((child, childIndex) => (
                  <Tree
                  key={childIndex}
                  comps={child}
                  depth={depth + 1}/>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
  <>
    <div>{renderTree(comps)}</div>
  </>

};

export default Tree;
