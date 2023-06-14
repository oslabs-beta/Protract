export interface Component {
  children: Component[];
  code: string;
}

export interface CurrentProject {
  currentProject: {
    children: { Component }[];
    code: string;
  };
}

export const dummy: CurrentProject[] = [
  {
    currentProject: {
      children: [
        {
          'app': {
            children: [
              {
                'headerComponent': {
                  children: [],
                  code: 'header-code;'
                }
              },
              {
                'mainComponent': {
                  children: [
                    {
                      'component1': {
                        children: [],
                        code: 'component1-code'
                      }
                    }
                  ],
                  code: '<component1/>\nmain-code;'
                }
              },
              {
                'footerComponent': {
                  children: [],
                  code: 'footer-code;'
                }
              }
            ],
            code: '<header/>\n<main/>\n<footer/>'
          }
        }
      ],
      code: '<app/>'
    }
  }
];
