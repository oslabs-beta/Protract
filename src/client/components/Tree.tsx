import React from 'react';
import { Component } from './dummyData';

interface TreeProps {
  root: Component;
}

const Tree: React.FC<TreeProps> = ({ root }) => {
  console.log('root', root);

  // destructure properties out of the current root node
  const { children, code, isComponent } = root;
  console.log('children', children[0]);
  console.log('code', code);
  console.log('isComponent', isComponent);


  const renderComponent = (component: Component) => {
    if (component.children.length) {};
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
