import { PlaygroundContext } from "./Playground";
import { useContext } from "react";

export default function FileDirectory() {
  const { comps, setItems, setCurrComp, setChildren } = useContext(PlaygroundContext);

  function handleClick(comp) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

  return (
    <div className="border-solid border-2 border-blue-600 flex-grow">
      <ul>
        {comps.map((comp) => 
        <li onClick={() => handleClick(comp)}>{comp.value}</li> )}
      </ul>
    </div>
  );
}
