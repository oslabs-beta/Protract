

export interface Component {
  [key: string]: {
    children: Component[];
    code: string;
  };
}

export const currentProject: Component = {
    app: {
      children: [
        {
          main: {
            children: [
              {
                header: {
                  children: [],
                  code: 'header-code;'
                 },
              },
              {
                mainDiv: {
                  children: [
                    {
                      component1: {
                        children: [],
                        code: 'component1-code'
                      }
                    }
                  ],
                  code: '<component1/>\nmain-code;'
                }
              },
              {
                footer: {
                  children: [],
                  code: 'footer-code;'
                }
              }
            ],
          code: '<header/>\n<mainDiv/>\n<footer/>'
          }
        }
      ],
      code: '<app>\n<main/>\n</app>'
    }
};


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
