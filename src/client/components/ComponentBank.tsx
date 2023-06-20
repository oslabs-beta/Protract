import React from 'react';
import BankEl from './BankEl';
import CustomComponentCreator from './CustomComponentCreator';

export default function ComponentBank() {
  const els: string[] = [
    'div',
    'a',
    'img',
    'ul',
    'ol',
    'form',
    'button',
    'li',
    'span',
    'h1',
    'h2',
    'h3',
  ];

  const elList: React.ReactElement[] = [];

  els.forEach((el, index) => {
    elList.push(<BankEl key={`key${index}`} id={el} />);
  });

  return (
    <div className="border-b border-gray-200 flex flex-col h-3/4 items-center">
      <CustomComponentCreator />
      <ul className="flex flex-col w-3/4 items-center scrollbar-thin scrollbar-thumb-white scrollbar-track-white border-solid border-sky-400 h-full overflow-y-scroll">
        {elList}
      </ul>
    </div>

  );
}
