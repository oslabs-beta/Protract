import React from 'react';
import { PlaygroundContext } from "./Playground";
import { useContext, useEffect } from "react";
import { Item } from '../../types';


interface TreeProps {
  root: Item;
  depth?: number;
}

const Tree: React.FC<TreeProps> = ({ root, depth = 0 }) => {

  const { comps, setCurrComp, setChildren } = useContext(PlaygroundContext);

  useEffect(() => {
    // console.log('comps updated, tree refreshed')
  }, [comps])

  // console.log('in tree');
  // console.log('comps', comps);
  // console.log('current recursive root', root);
  // console.log('currComp', currComp);

  function handleClick(comp: Item) {
    setCurrComp(comp)
    // if (comp.children.length > 0) setChildren(comp.children);
    setChildren(comp.children)
    // console.log('component clicked in tree: ', comp);
  }

  /**
   * This function recursively creates a tree-like structure of the passed in object and its nested children
   *
   * @param {Comp | Item} currentComponent - the current
   * @returns {JSX.Element} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentComponent: Item, currentDepth: number) => {
    const { value, children } = currentComponent;
    // console.log('currentComponent in renderTree()', currentComponent);

    return (
      <div className={`ml-${currentDepth * 4} flex flex-col items-center`}>
        {currentComponent.canEnter && (
          <div onClick={() => handleClick(currentComponent)} className="mt-4">
            <strong>{value}</strong>
          </div>
        )}

        {children && children.length > 0 && (
          <div className="flex">
            {children.map((child, index) => (
              <Tree key={index} root={child} depth={currentDepth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return <>{renderTree(root, depth)}</>;

};

export default Tree;
