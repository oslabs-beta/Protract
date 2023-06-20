import { useState, useContext, Children } from "react";
import { PlaygroundContext } from "./Playground";
import { Item } from "../../types";


export default function CustomComponentCreator() {
  const [input, setInput] = useState('');

  const { setComps, comps, children, currComp, setChildren, handleUpdateApp } = useContext(PlaygroundContext);

  function handleChange(e: string) {
    setInput(e)
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      // change id's code to ensure uniqueness
      const newComp = { value: input, id: `${input}-${children.length}`, code: `<${input}></${input}>\n`, canEnter: true, children: []}

      setChildren((prev) => [...prev, newComp])
      const updatedComp = handleUpdateApp(comps, currComp, newComp)
      setComps(updatedComp)
      setInput('');
    }
  }

  return (
    <div className="border-purple-500 flex w-full justify-center">
      <form className="justify-center my-4 flex w-3/4"
      onSubmit={(e) => handleSubmit(e)}>
        <input
        className="flex-grow border border-red-700 rounded-l-md min-w-full block text-center text-l focus:outline-none"
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
