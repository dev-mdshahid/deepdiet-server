import { registerUserController } from './register-user.controller';
import { loginController } from './login.controller';
import { refreshTokenController } from './refresh-token.controller';
import { forgotPasswordController } from './forgot-password.controller';
import { logoutController } from './logout.controller';

export const AuthControllers = {
    registerUser: registerUserController,
    login: loginController,
    logout: logoutController,
    refreshToken: refreshTokenController,
    forgotPassword: forgotPasswordController,
};
