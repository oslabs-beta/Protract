


  import { currentProject, Component } from './dummyData';

  const renderComponent = (component: Component): JSX.Element => {
    const { code, children } = component;
    return (
      <div key={code}>
        {code}
        {children.map((child) => renderComponent(child))}
      </div>
    );
  };

  const Tree: React.FC<any> = () => {
    return (
      <div className="w-full h-full p-3 bg-red-100">
        {/* {currentProject.map((project, index) => (
          <div key={index}>{renderComponent(project)}</div>
        ))} */}
        { currentProject }
      </div>
    );
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
