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
    <ul className="scrollbar-thin scrollbar-thumb-white scrollbar-track-white border-solid border border-sky-400 mt-5 h-3/4 overflow-y-scroll">
      <CustomComponentCreator/>
      {elList}
    </ul>
  );
}
