


export default function Tree() {

  const dummy = [
    {
      currentProject: {

        children: [
          {
            app: {
              children: [
                {
                  header: {
                    children: [],
                    code: 'header-code;'
                   },
                },
                {
                  main: {
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
            code: '<header/>\n<main/>\n<footer/>'
            }
          }
        ],
        code: '<app/>'
      }
    }
  ];

  return (
    <div className="w-full h-full p-3 bg-red-100">
      {{ dummy }}
    </div>
  );
}
