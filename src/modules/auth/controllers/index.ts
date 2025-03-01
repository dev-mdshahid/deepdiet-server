import { registerUserController } from './register-user.controller';
import { loginController } from './login.controller';
import { refreshTokenController } from './refresh-token.controller';
import { logoutController } from './logout.controller';
import { resetPasswordController } from './reset-password.controller';

export const AuthControllers = {
    registerUser: registerUserController,
    login: loginController,
    logout: logoutController,
    refreshToken: refreshTokenController,
    resetPassword: resetPasswordController,
};
