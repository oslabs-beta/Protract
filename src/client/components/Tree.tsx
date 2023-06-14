import React from 'react';
import { Component } from './dummyData';

interface TreeProps {
  currentProject: Component;
}

const Tree: React.FC<TreeProps> = ({ currentProject }) => {
  // const root = currentProject.root;
  // console.log(root);

  // // destructure properties out of the root node
  // const { children, code } = root;
  // console.log('children', children);
  // console.log('code', code);

  // children.forEach((child, i) => {
  //   console.log('child', child);
  // })


  // create function to recursive render components
  const renderTree = (component) => {
    console.log('current component', component);
    const { children, code } = component;
    console.log('children', children);
    // children.forEach((child, i) => {
    //   console.log('child', child, i);
    //   console.log('child property', Object.keys(child));
    // });

    return (
      <div>
        {children.map((child, index) => (
          <Tree key={index} currentProject={child} />
        ))}
      </div>
    )
  };

  return <div>{renderTree(currentProject)}</div>;
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
