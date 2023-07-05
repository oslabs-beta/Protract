import React, { useState, useContext } from 'react';
import { PlaygroundContext } from './Playground';

export default function CustomComponentCreator() {
  const [input, setInput] = useState('');

  const { setComps, comps, children, currComp, setChildren, handleUpdateApp } =
    useContext(PlaygroundContext);

  function handleChange(e: string) {
    setInput(e);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length) {
      // change id's code to ensure uniqueness
      // const angularVer = input.charAt(0).toUpperCase() + input.toLowerCase().slice(1).replace(' ', '-');
      const angularVer = input.toLowerCase().replace(' ', '-');
      const newComp = {
        value: input,
        id: `${input}-${children.length}`,
        code: `<${angularVer}></${angularVer}>\n`,
        canEnter: true,
        children: [],
      };

      setChildren((prev) => [...prev, newComp]);
      const updatedComp = handleUpdateApp(comps, currComp, newComp);
      setComps(updatedComp);
      setInput('');
    }
  }

  return (
    <div className="flex w-full justify-center border-purple-500">
      <form
        className="my-4 flex w-3/4 justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="text-l block min-w-full flex-grow rounded-l-md border border-red-600 pl-2 text-center focus:outline-none"
          placeholder="Component Name"
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          maxLength={30}
          style={{ textAlign: 'left' }}
        />
        <button
          type="submit"
          className="rounded-r-md bg-red-600 px-3 py-1 text-white hover:bg-red-500"
        >
          Add
        </button>
      </form>
    </div>
  );
}
