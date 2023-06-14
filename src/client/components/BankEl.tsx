export default function BankEl(props: { key: string; value: string }) {
  const { value } = props;
  return (
    <button className="border-2 border-gray-300 m-3 p-2 bg-gray-300 rounded" onClick="">
      {value}
    </button>
  );
}
