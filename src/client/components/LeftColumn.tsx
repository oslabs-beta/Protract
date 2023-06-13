import ComponentBank from './ComponentBank';
import FileDirectory from './FileDirectory';

export default function LeftColumn() {
  return (
    <div className="basis-1/4 flex flex-col border-2 border-solid border-gray-500">
      <ComponentBank />
      <FileDirectory />
    </div>
  );
}
