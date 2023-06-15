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
    <div>
      <form
      onSubmit={(e) => handleSubmit(e)}>
        <input
        placeholder='Component Name' 
        type='text'
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}