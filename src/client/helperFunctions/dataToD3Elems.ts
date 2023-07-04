import { RawNodeDatum } from "react-d3-tree";
import { Item } from "../../types";

// helper function to convert app to readable format for react-d3-trees
export const convertDataToElements = (root: Item) => {
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
