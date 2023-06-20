import ComponentBank from './ComponentBank';
import FileDirectory from './FileDirectory';

export default function LeftColumn() {
  return (
    <div className="basis-1/4 flex flex-col border-r border-solid border-gray-200 ">
      <ComponentBank />
      <FileDirectory />
    </div>
  );
}
