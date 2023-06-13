import React from 'react';
import BankEl from './BankEl';

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
    elList.push(<BankEl key={`key${index}`} value={el} />);
  });

  return (
    <div className="border-solid border-2 border-sky-400 my-5">{elList}</div>
  );
}
