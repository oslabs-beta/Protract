import React from 'react';
import { PlaygroundContext } from './Playground';
import { useContext, useEffect, useRef } from 'react';
import { RawNodeDatum, Tree } from 'react-d3-tree';
import { Item } from '../../types';
import * as d3 from 'd3';
import { UniqueIdentifier } from '@dnd-kit/core';

interface TreeProps {
  root: Item;
}


const FlowTree: React.FC<TreeProps> = ({ root }) => {
  const { setCurrComp, setChildren } = useContext(PlaygroundContext);

  // nodeData is basically the Item type, except with additional d3-tree specific properties (name and __rd3t)
  function handleClick(nodeData: any) {
    // destructure from nodeData
    const { id, children, code, value, canEnter } = nodeData;

    // construct the Item object we're used to
    const comp = { id, children, code, value, canEnter }
    setCurrComp(comp)
    setChildren(children)
  }

  // Configure double click zoom capability, not currently working
  const treeContainerRef = useRef(null);

  useEffect(() => {
    const zoom = d3.zoom().scaleExtent([0.1, 1]);

    d3.select(treeContainerRef.current).call(zoom).on('dblclick.zoom', null);
  }, []);

  const elements = convertDataToElements(root);


  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect width="16" height="16" x="-8" rx="20" ry="20" fill="#b91c1c" onClick={() => handleClick(nodeDatum) } />
      <text fill="black" strokeWidth="1" x="13" y="13" onClick={() => handleClick(nodeDatum)}>
        {nodeDatum.name}
      </text>
    </g>
  );


  // Styling currently does not apply. Consider styling in a css/sass file, then importing?
  return (
    <div ref={treeContainerRef} style={{ width: '100%', height: '100%' }}>
      <Tree
        data={elements}
        translate={{ x: 175, y: 40 }}
        nodeSize={{ x: 100, y: 50 }}
        separation={{ siblings: .9, nonSiblings: 1.0 }}
        collapsible={false}
        zoomable={true}
        orientation="vertical"
        pathFunc="diagonal"
        onNodeClick={(nodeData, e) => handleClick(nodeData.data)}
        rootNodeClassName='nodeRoot'
        branchNodeClassName='nodeBranch'
        leafNodeClassName='nodeLeaf'
        depthFactor={125}
        zoomable={false}
        zoom={.9}
        renderCustomNodeElement={renderRectSvgNode}
      // scaleExtent={{max:.9, min:.9}}

      // nodeSvgShape={{
      //   shape: 'circle',
      //   shapeProps: {
      //     r: 10,
      //     fill: '#B91C1C',
      //     stroke: '#000',
      //   },
      //   label: {
      //     textAnchor: 'end',
      //     fontSize: 14,
      //     fontWeight: 700,
      //     transform: 'translate(-15px, 0)',
      //   },
      // }}
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
    const element: RawNodeDatum = { ...node, name: value.toString(), children: [] };

    // loop through children arrays if present
    if (children && children.length > 0) {
      children.forEach((child) => {
        // childElement will equal recursive calls to traverse each child, resulting in subsequent element arrays being populated
        const childElement: RawNodeDatum = traverse(child);
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
