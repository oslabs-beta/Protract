import { Item } from "../../types";
import { PlaygroundContext } from "./Playground";
import { useContext } from "react";

export default function FileDirectory(props: { comps: Item, depth: number }) {
  const { setCurrComp, setChildren } = useContext(PlaygroundContext);
  const {comps, depth} = props;

  function handleClick(comp: Item) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

 const renderTree = (currentComponent: Item) => {
    const { value, children } = currentComponent;

    return (
        <div className={` border-l ${depth > 0 ? 'ml-4 pl-1' : ''}`}>
          <strong style={{ cursor: 'pointer' }} onClick={() => handleClick(currentComponent)}>{value}</strong>
          {children && children.length > 0 && (
            <div>
              {children.map((child, index) => (
                child.canEnter &&
                <div key={index} className={''}>
                  <div>
                    <FileDirectory comps={child} depth={depth + 1} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    );
  };

  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
      {renderTree(comps)}
      </div>
  );
};
