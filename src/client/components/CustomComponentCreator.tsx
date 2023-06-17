import { useState, useContext } from "react";
import { PlaygroundContext } from "./Playground";


export default function CustomComponentCreator() {
  const [input, setInput] = useState('');
  
  const { items, setItems } = useContext(PlaygroundContext);

  function handleChange(e) {
    setInput(e)
  }

    function handleSubmit(e) {
    e.preventDefault();
    if (input.trim().length) {
      setItems((items) => [...items, { value: input, id: `${input}-${items.length}`, code: `<${input}></${input}>\n` }]);
      setInput('');
    }
  }

  return (
    <div className="flex">
      <form
      onSubmit={(e) => handleSubmit(e)}>
        <input
        className="w-32 font-mono"
        placeholder='Component Name' 
        type='text'
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        ></input>
        <button type="submit" className="font-mono px-2 mx-2 text-white rounded-md bg-red-900 hover:bg-red-700">Add</button>
      </form>
    </div>
  )
}