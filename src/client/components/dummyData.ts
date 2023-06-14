

export interface Component {
  children: {
    [key: string]: Component;
  }[];
  code: string;
}


export const currentProject: Component =
  {
    children: [
      {
        app: {
          children: [
            {
              headerComponent: {
                children: [],
                code: 'header-code;'
              }
            },
            {
              mainComponent: {
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
              footerComponent: {
                children: [],
                code: 'footer-code;'
              }
            }
          ],
          code: '<headerComponent/>\n<mainComponent/>\n<footerComponent/>'
        }
      }
    ],
    code: '<app/>'
  };
