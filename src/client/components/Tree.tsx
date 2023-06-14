import React from 'react';
import { Component } from './dummyData';

interface TreeProps {
  currentProject: Component;
  depth?: number;
}

const Tree: React.FC<TreeProps> = ({ currentProject, depth = 0 }) => {

  /**
   * This function recursively create a file directory-like tree
   *
   * @param {Type} currentLevel - the current
   * @returns {Type} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentLevel: Component) => {
    console.log(currentLevel);
    // create an array of the current level's node names
    const currentNodeNames = Object.keys(currentLevel);

    return (
      <div>
        {/* map out this level's JSX, using the current array of node names */}
        {currentNodeNames.map((nodeName, index) => {
          // index the current level by the current node name
          const node = currentLevel[nodeName];

          // destructure children nodes for recursive call
          const { children, code } = node;

          // build the current level's JSX
          return (
            <div key={index} className={`pl-4 border-l ${depth > 0 ? 'ml-4' : ''}`}>
              <strong>{nodeName}</strong>
              <div>
                <code>{code}</code>
              </div>
              <div>
                {/* Recursively create a new Tree component, increasing depth each time */}
                {children.map((child, childIndex) => (
                  <Tree
                  key={childIndex}
                  currentProject={child}
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
    <div>{renderTree(currentProject)}</div>
  </>

  );
};

export default Tree;
