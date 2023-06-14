import LeftColumn from './LeftColumn';
import Canvas from './Canvas';
import Preview from './Preview';

export default function Playground() {
  return (
    <div className="flex flex-row border-solid border-4 border-green-600 h-1/2">
      <LeftColumn />
      <Canvas />
      <Preview />
    </div>
  );
}
