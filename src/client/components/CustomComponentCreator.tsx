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
      <form className="flex mx-4"
      onSubmit={(e) => handleSubmit(e)}>
        <input
        className="flex-grow min-w-0 block text-center text-l"
        placeholder='Component Name' 
        type='text'
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit" className="px-3 py-1 ml-2 text-white rounded-md bg-red-700 hover:bg-red-600">Add</button>
      </form>
    </div>
  )
}