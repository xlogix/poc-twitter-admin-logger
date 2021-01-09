import AuthService from '../services/auth.service';
class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.signUp = async (req, res, next) => {
            const userData = req.body;
            try {
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({ data: signUpUserData, message: 'signup' });
            }
            catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next) => {
            const userData = req.body;
            try {
                const { cookie, findUser } = await this.authService.login(userData);
                res.setHeader('Set-Cookie', [cookie]);
                res.status(200).json({ data: findUser, message: 'login' });
            }
            catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next) => {
            const userData = req.user;
            try {
                const logOutUserData = await this.authService.logout(userData);
                res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
                res.status(200).json({ data: logOutUserData, message: 'logout' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default AuthController;
//# sourceMappingURL=auth.controller.js.map