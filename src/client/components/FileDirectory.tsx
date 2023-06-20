import { Item } from "../../types";
import { PlaygroundContext } from "./Playground";
import { useContext } from "react";

export default function FileDirectory() {
  const { comps, setCurrComp, setChildren } = useContext(PlaygroundContext);

  // console.log('in fileDirectory');
  // console.log('comps', comps);


  function handleClick(comp: Item) {
    setCurrComp(comp)
    setChildren(comp.children)
  }

  return (
    <div className="border-solid border-0 border-blue-600 flex-grow">
      <ul>
        {comps.map((comp) =>
        <li onClick={() => handleClick(comp)}>{comp.value}</li> )}
      </ul>
    </div>
  );
}
