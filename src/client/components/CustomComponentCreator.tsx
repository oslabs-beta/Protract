import { useState, useContext, Children } from "react";
import { PlaygroundContext } from "./Playground";


export default function CustomComponentCreator() {
  const [input, setInput] = useState('');
  
  const { setComps, comps, children, setChildren } = useContext(PlaygroundContext);

  function handleChange(e: string) {
    setInput(e)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      const newComp = { value: input, id: `${input}-${children.length}`, code: `<${input}></${input}>\n`, canEnter: true, children: []}
      setChildren((prev) => [...prev, newComp])
      setComps((prev) => [...prev, newComp])
      setInput('');
      console.log('comps', comps)
      console.log('children', children)
    }
  }

  return (
    <div>
      <form className="flex mx-4 border-2 rounded-md"
      onSubmit={(e) => handleSubmit(e)}>
        <input
        className="flex-grow min-w-0 block text-center text-l focus:outline-none"
        placeholder='Component Name' 
        type='text'
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit" className="px-3 py-1 text-white rounded-r-md bg-red-700 hover:bg-red-600">Add</button>
      </form>
    </div>
  )
}