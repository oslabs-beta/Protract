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
        translate={{ x: 0, y: 0 }}
        nodeSize={{ x: 200, y: 100 }}
        separation={{ siblings: 1.2, nonSiblings: 1.2 }}
        collapsible={false}
        zoomable={false}
        orientation="vertical"
        pathFunc="step"
        depthFactor={200}
        styles={{
          nodes: {
            node: {
              circle: {
                fill: '#fff',
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

const convertDataToElements = (project: Item) => {
  const traverse = (node: Item) => {
    const { value, children, canEnter } = node;

    if (!canEnter) {
      return null;
    }

    const element = { name: value, children: [] };

    if (children && children.length > 0) {
      children.forEach((child) => {
        const childElement = traverse(child);
        if (childElement) {
          element.children.push(childElement);
        }
      });
    }

    return element;
  };

  const elements = traverse(project);

  return elements;
};


export default FlowTree;
