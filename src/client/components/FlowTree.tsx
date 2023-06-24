import React from 'react';
import { PlaygroundContext } from './Playground';
import { useContext, useEffect, useRef } from 'react';
import { RawNodeDatum, TreeNodeDatum, Tree } from 'react-d3-tree';
import { Item } from '../../types';

interface TreeProps {
  root: Item;
}

const FlowTree: React.FC<TreeProps> = ({ root }) => {
  const { setCurrComp, setChildren } = useContext(PlaygroundContext);

  // nodeData is basically the Item type, except with additional d3-tree specific properties (name and __rd3t)
  function handleNodeClick(nodeData: any) {
    // destructure from nodeData
    const { id, children, code, value, canEnter } = nodeData;

    // construct the Item object we're used to
    const comp = { id, children, code, value, canEnter }
    setCurrComp(comp)
    setChildren(children)
  }

  const elements = convertDataToElements(root);

//Prevents the node names from overlapping and being too long
  const abbrev = (nodeName: string): string => {
    if(nodeName && nodeName.length > 10){ return nodeName.slice(0,7) + '...'}
    return nodeName;
  }

//Changes the SVG associated with the node and where the text shows in relation to node
  const renderSvgNode = ({ nodeDatum }: { nodeDatum: TreeNodeDatum }) => (
    <g>
      <rect width="16" height="16" x="-8" rx="20" ry="20" fill="#b91c1c" onClick={() => handleNodeClick(nodeDatum) } />
      <text fill="black" strokeWidth="1" x="13" y="13" onClick={() => handleNodeClick(nodeDatum)}>
        {abbrev(nodeDatum.name)}
      </text>
    </g>
  );


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Tree
        data={elements}
        translate={{ x: 175, y: 40 }}
        nodeSize={{ x: 100, y: 50 }}
        separation={{ siblings: .9, nonSiblings: .9 }}
        collapsible={false}
        zoomable={true}
        orientation="vertical"
        pathFunc="diagonal"
        rootNodeClassName='nodeRoot'
        branchNodeClassName='nodeBranch'
        leafNodeClassName='nodeLeaf'
        depthFactor={125}
        renderCustomNodeElement={renderSvgNode}
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
      return;
    }

    // create a new element, in the fashion of d3-tree syntax
    const element: RawNodeDatum|undefined = { ...node, name: value.toString(), children: [] };

    // loop through children arrays if present
    if (children && children.length > 0) {
      children.forEach((child) => {
        // childElement will equal recursive calls to traverse each child, resulting in subsequent element arrays being populated
        const childElement: RawNodeDatum|undefined = traverse(child);
        // if childElement is not null, push to the element's children array
        if (childElement && element.children) {
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
