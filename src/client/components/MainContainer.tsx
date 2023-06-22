import Navbar from './Navbar';
import Playground from './Playground';
import Footer from './Footer';
import TestingComp from './TestingLoginComp';

export default function MainContainer() {
  return (
    <div className="flex h-screen flex-col border-0 border-red-500">
      <Playground />
      {/* <Footer /> */}
      {/* <TestingComp /> */}
    </div>
  );
}
