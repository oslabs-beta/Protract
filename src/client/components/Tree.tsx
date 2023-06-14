import React from 'react';
import { Component } from './dummyData';

interface TreeProps {
  root: Component;
}

const Tree: React.FC<TreeProps> = ({ root }) => {
  console.log('root', root);
  const renderComponent = (component: Component) => {

  };

  return <div>{renderComponent(root)}</div>;
  // return <pre>{root}</pre>
};

export default Tree;


  // const dummy = [
//   {
//     currentProject: {

//       children: [
//         {
//           app: {
//             children: [
//               {
//                 header: {
//                   children: [],
//                   code: 'header-code;'
//                  },
//               },
//               {
//                 main: {
//                   children: [
//                     {
//                       component1: {
//                         children: [],
//                         code: 'component1-code'
//                       }
//                     }
//                   ],
//                   code: '<component1/>\nmain-code;'
//                 }
//               },
//               {
//                 footer: {
//                   children: [],
//                   code: 'footer-code;'
//                 }
//               }
//             ],
//           code: '<header/>\n<main/>\n<footer/>'
//           }
//         }
//       ],
//       code: '<app/>'
//     }
//   }
// ];
