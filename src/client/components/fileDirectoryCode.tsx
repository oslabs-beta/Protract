const app = {value: 'app', codeStart: '<app>', codeEnd: '</app>', children: []}

export interface Component {
  value: string;
  id: string;
  code: string;
  children: Component[];
  onClick?: () => void;
}

// export interface Component {
//   [key: string]: {
//     children: Component[];
//     code: string;
//   };
// }

export const currentProject: Component = {
  value: 'app',
  id: '0',
  code: '<app/>',
  children: [
    {
      value: 'comp1',
      id: '1',
      code: '<comp1/>',
      children: [
        {
          value: 'comp3',
          id: '3',
          code: '<comp3/>',
          children: []
        }
      ]
    },
    {
      value: 'comp2',
      id: '2',
      code: '<comp2/>',
      children: [
        {
          value: 'comp4',
          id: '4',
          code: '<comp4/>',
          children: [
            {
              value: 'comp5',
              id: '5',
              code: '<comp5/>',
              children: []
            }
          ]
        }
      ]
    },
    {
      value: 'bloop',
      id: 'bloop',
      code: '<bloop/>',
      children: []
    }
  ]
}

// export const currentProject: Component = {
//     app: {
//       children: [
//         {
//           main: {
//             children: [
//               {
//                 header: {
//                   children: [],
//                   code: 'header-code;'
//                  },
//               },
//               {
//                 mainDiv: {
//                   children: [
//                     {
//                       component1: {
//                         children: [],
//                         code: 'component1-code'
//                       }
//                     }
//                   ],
//                   code: '<component1/>\nmainDiv-code;'
//                 }
//               },
//               {
//                 footer: {
//                   children: [],
//                   code: 'footer-code;'
//                 }
//               }
//             ],
//           code: '<header/>\n<mainDiv/>\n<footer/>'
//           }
//         }
//       ],
//       code: '<app>\n<main/>\n</app>'
//     }
// };


// export const currentProject: Component =
//   {
//     children: [
//       {
//         app: {
//           children: [
//             {
//               headerComponent: {
//                 children: [],
//                 code: 'header-code;'
//               }
//             },
//             {
//               mainComponent: {
//                 children: [
//                   {
//                     component1: {
//                       children: [],
//                       code: 'component1-code'
//                     }
//                   }
//                 ],
//                 code: '<component1/>\nmain-code;'
//               }
//             },
//             {
//               footerComponent: {
//                 children: [],
//                 code: 'footer-code;'
//               }
//             }
//           ],
//           code: '<headerComponent/>\n<mainComponent/>\n<footerComponent/>'
//         }
//       }
//     ],
//     code: '<app/>'
//   };

import React from 'react';
import { Component } from './dummyData';

interface TreeProps {
  currentProject: Component;
  depth?: number;
}

const Tree: React.FC<TreeProps> = ({ currentProject, depth = 0,}) => {

  /**
   * This function recursively create a file directory-like tree
   *
   * @param {Type} currentComponent - the current
   * @returns {Type} - JSX of a series of divs, each representing a node / nested node
   */
  const renderTree = (currentComponent: Component) => {
    console.log('in renderTree (in Tree)');
    console.log('currentProject', currentProject);
    console.log('currentComponent', currentComponent);
    // destructure current component's name and its children array
    const { value, children } = currentComponent;
    console.log('children destructured from currentLevel', children);
    console.log('value duestructured', value);

    return (
      <div>
        <div className={` border-l ${depth > 0 ? 'ml-4' : ''}`}>
          <strong>{value}</strong>
          {children && children.length > 0 && (
            <div>
              {children.map((child, index) => (
                <div key={index} className={`border-l`}>
                  <div>
                    <Tree currentProject={child} depth={depth + 1} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
  <>
    <div>{renderTree(currentProject)}</div>
  </>

  );
};

export default Tree;
