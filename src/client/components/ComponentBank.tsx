import React from 'react';
import BankEl from './BankEl';
import CustomComponentCreator from './CustomComponentCreator';

export default function ComponentBank() {
  const els: string[] = [
    'div',
    'anchor',
    'image',
    'unordered list',
    'ordered list',
    'form',
    'button',
    'list item',
    'span',
    'header 1',
    'header 2',
    'header 3',
  ];

  const elList: React.ReactElement[] = [];

  els.forEach((el, index) => {
    elList.push(<BankEl key={`key${index}`} id={el} />);
  });

  return (
    <ul className="scrollbar-thin scrollbar-thumb-white scrollbar-track-white border-solid border-2 border-sky-400 my-5 h-3/4 overflow-y-scroll">
      <CustomComponentCreator/>
      {elList}
    </ul>
  );
}
