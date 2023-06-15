import { ComponentContext } from "./ComponentContext";
import { useContext } from 'react'



export default function BankEl(props: { key: string; value: string }) {

  const {currComponent, setCurrComponent} = useContext(ComponentContext);

  const { value } = props;
  return (
    <button onClick={() => setCurrComponent([value])} className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded">
      {value}
    </button>
  );
}
