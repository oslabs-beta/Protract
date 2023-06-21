import React from 'react';
import { PlaygroundContext } from './Playground';
import { useContext, useEffect, useRef } from 'react';
import { Tree } from 'react-d3-tree';
import { Item } from '../../types';
import * as d3 from 'd3';

interface TreeProps {
  root: Item;
}

const FlowTree: React.FC<TreeProps> = ({ root }) => {
  const { setCurrComp, setChildren } = useContext(PlaygroundContext);

  function handleClick(comp: Item) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

  const treeContainerRef = useRef(null);

  useEffect(() => {
    const zoom = d3.zoom().scaleExtent([0.1, 1]);

    d3.select(treeContainerRef.current).call(zoom).on('dblclick.zoom', null);
  }, []);

  const elements = convertDataToElements(root);

  return (
    <div ref={treeContainerRef} style={{ width: '100%', height: '100%' }}>
      <Tree
        data={elements}
        translate={{ x: 175, y: 40 }}
        nodeSize={{ x: 200, y: 100 }}
        separation={{ siblings: 0.6, nonSiblings: 0.6 }}
        collapsible={true}
        zoomable={true}
        orientation="vertical"
        pathFunc="step"
        depthFactor={200}
        styles={{
          nodes: {
            node: {
              circle: {
                fill: (node: any) => (node.data.children.length ? 'B91C1C' : 'FFF'),
                stroke: '#000',
              },
              name: {
                textAnchor: 'start',
                dominantBaseline: 'central',
                fontSize: 14,
                fontWeight: 700,
              },
            },
          },
        }}
      />
    </div>
  );
};

// helper function to convert app to readable format for react-d3-trees
const convertDataToElements = (root: Item) => {
  // helper function to traverse nodes
  const traverse = (node: Item) => {
    const { value, children, canEnter } = node;

    // if current node is not a component, return out
    if (!canEnter) {
      return null;
    }

    // create a new element, in the fashion of d3-tree syntax
    const element = { name: value, children: [] };

    // loop through children arrays if present
    if (children && children.length > 0) {
      children.forEach((child) => {
        // childElement will equal recursive calls to traverse each child, resulting in subsequent element arrays being populated
        const childElement = traverse(child);
        // if childElement is not null, push to the element's children array
        if (childElement) {
          element.children.push(childElement);
        }
      });
    }

    return element;
  };

  // construct the desired d3-tree elements array using traverse()
  const elements = traverse(root);

  return elements;
};


export default FlowTree;
