import Navbar from './Navbar';
import Playground from './Playground';
import Footer from './Footer';
import TestingComp from './TestingLoginComp'

export default function MainContainer() {
  return (
    <div className="flex flex-col border-0 border-red-500 h-screen">
      <Navbar />
      <Playground />
      {/* <Footer /> */}
      {/* <TestingComp /> */}
    </div>
  );
}
