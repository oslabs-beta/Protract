

export interface Component {
  children: {
    [key: string]: Component;
  }[];
  isComponent?: boolean;
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
                isComponent: true,
                code: 'header-code;'
              }
            },
            {
              mainComponent: {
                children: [
                  {
                    component1: {
                      children: [],
                      isComponent: true,
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
                isComponent: true,
                code: 'footer-code;'
              }
            }
          ],
          code: '<headerComponent/>\n<mainComponent/>\n<footerComponent/>'
        }
      }
    ],
    isComponent: true,
    code: '<app/>'
  };
