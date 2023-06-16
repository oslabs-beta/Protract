import { useState, useContext } from "react";
import { PlaygroundContext } from "./Playground";


export default function CustomComponentCreator() {
  const [input, setInput] = useState('');
  
  const { items, setItems } = useContext(PlaygroundContext);

  function handleChange(e: string) {
    setInput(e)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      setItems((items) => [...items, { value: input, id: `${input}-${items.length}`, code: `<${input}></${input}>\n`, canEnter: true }]);
      setInput('');
    }
  }

  return (
    <div className="ml-4">
      <form
      onSubmit={(e) => handleSubmit(e)}>
        <input
        className="w-3/4 h-10 rounded"
        placeholder='Component Name' 
        type='text'
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        ></input>
        <button className="mr-4 float-right p-2 px-5 bg-green-300 rounded" type="submit">Add</button>
      </form>
    </div>
  )
}