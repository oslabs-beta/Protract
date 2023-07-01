import Playground from '../Playground';
import React from 'react';

export default function MainContainer() {
  return (
    <div className="flex h-screen flex-col border-0 border-red-500">
      <Playground />
      {/* <Footer /> */}
      {/* <TestingComp /> */}
    </div>
  );
}
