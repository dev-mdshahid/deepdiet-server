import { Router } from 'express';
import { AuthControllers } from './controllers';
import { ValidateRequest } from '../../middlewares/validate-request';
import { AuthValidationSchema } from './auth.validation';
import { AuthGuard } from '../../middlewares/auth-guard';
import { TUserRole } from './auth.interface';

export const AuthRouter = Router();

AuthRouter.post(
    '/register-user',
    ValidateRequest(AuthValidationSchema.register),
    AuthControllers.registerUser
);
AuthRouter.post(
    '/login',
    ValidateRequest(AuthValidationSchema.login),
    AuthControllers.login
);
AuthRouter.post(
    '/forgot-password',
    ValidateRequest(AuthValidationSchema.resetPassword),
    AuthControllers.resetPassword
);

AuthRouter.get('/refresh-token', AuthControllers.refreshToken);

AuthRouter.delete('/logout', AuthGuard(TUserRole.USER), AuthControllers.logout);
