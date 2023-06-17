import { PlaygroundContext } from "./Playground";
import { useContext } from "react";

export default function FileDirectory() {
  const { comps, setItems } = useContext(PlaygroundContext);

  function handleClick(comp) {
    console.log(comp.value);
    setItems([]);
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
