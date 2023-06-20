import { PlaygroundContext } from "./Playground";
import { useContext } from "react";
import { Comp } from "../../types";

export default function FileDirectory() {
  const { comps, setCurrComp, setChildren } = useContext(PlaygroundContext);

  function handleClick(comp: Comp) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

  return (
    <div className="border-solid border-0 border-blue-600 flex-grow">
      <ul>
        {comps.map((comp) => 
        <li key={comp.value} onClick={() => handleClick(comp)}>{comp.value}</li> )}
      </ul>
    </div>
  );
}
