import { registerUserService } from './register-user.service';
import { loginService } from './login.service';
import { refreshTokenService } from './refresh-token.service';
import { forgotPasswordService } from './forgot-password.service';

export const AuthServices = {
    registerUser: registerUserService,
    login: loginService,
    refreshToken: refreshTokenService,
    forgotPassword: forgotPasswordService,
};
