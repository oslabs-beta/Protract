import React from 'react';
import { PlaygroundContext } from './Playground';
import { useContext } from 'react';
import { RawNodeDatum, TreeNodeDatum, Tree } from 'react-d3-tree';
import { Item } from '../../types';
import { convertDataToElements } from '../helperFunctions/dataToD3Elems';

interface TreeProps {
  root: Item;
}

const FlowTree: React.FC<TreeProps> = ({ root }) => {

  const { setCurrComp, setChildren, comps, currComp } = useContext(PlaygroundContext);

  // nodeData is basically the Item type, except with additional d3-tree specific properties (name and __rd3t)
  function handleNodeClick(nodeData: any) {
    // destructure from nodeData
    const { value } = nodeData;

    function updateCanvas(children: Item[], value: string) {
      children.map((comp) => {
        if (comp.value === value) {
          setCurrComp(comp);
          setChildren(comp.children)
          return;
        } else {
          updateCanvas(comp.children, value);
        }
        }
    )};

    updateCanvas(comps, value);

    // setCurrComp(comp)
    // setChildren(comp.children)
  }

  // convert root object to a d3 compliant data structure
  const elements = convertDataToElements(root);

//Prevents the node names from overlapping and being too long
  const abbrev = (nodeName: string): string => {
    if(nodeName && nodeName.length > 10){ return nodeName.slice(0,7) + '...'}
    if(nodeName === 'App'){ return nodeName.toLowerCase()}
    return nodeName;
  }

//Changes the SVG associated with the node and where the text shows in relation to node
  const renderSvgNode = ({ nodeDatum }: { nodeDatum: TreeNodeDatum }) => (
    <g>
      <rect width="16" height="16" x="-8" rx="20" ry="20" fill="#dc2626" onClick={() => handleNodeClick(nodeDatum) } />
      <text fill="black" strokeWidth="1" x="10" y="13" onClick={() => handleNodeClick(nodeDatum)}>
        {abbrev(nodeDatum.name)}
      </text>
    </g>
  );


  return (
    <div id="flowTree" style={{ width: '100%', height: '100%' }}>
      <Tree
        data={elements}
        translate={{ x: 125, y: 40 }}
        nodeSize={{ x: 100, y: 50 }}
        separation={{ siblings: .9, nonSiblings: .9 }}
        collapsible={false}
        zoomable={false}
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

export default FlowTree;
