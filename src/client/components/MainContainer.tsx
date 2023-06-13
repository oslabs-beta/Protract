import Navbar from './Navbar';
import Playground from './Playground';
import Footer from './Footer';

export default function MainContainer() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Playground />
      <Footer />
    </div>
  );
}
