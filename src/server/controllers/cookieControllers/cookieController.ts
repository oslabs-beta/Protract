interface CookieController {
    setCookie: (req: any, res: any, next: any) => Promise<void>;
    setSSIDCookie: (req: any, res: any, next: any) => Promise<void>;
}
const cookieController: CookieController = {

// setCookie Test

setCookie: async (req, res, next) => {
    console.log('cookie created')
    res.cookie('Project', 'Protract');
    return next();
  },

// setSSIDCookie - store the user id in a cookie

setSSIDCookie: async (req, res, next) => {
    const { id } = res.locals.user
    try{
        res.cookie('ssid', id);
        console.log('SSID cookie successfully created')
        return next();
    } catch(err) {
        return next({
            log: 'cookieController',
            status: 400,
            message: `Error in returning setSSIDCookie Controller, ${err}`,
        });
    }
  }
}

export default cookieController;