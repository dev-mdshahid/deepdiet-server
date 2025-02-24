import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { OtpRouter } from '../modules/otp/otp.router';

export const AppRouter = Router();

const routes = [
  {
    path: '/auth',
    router: AuthRouter,
  },
  {
    path: '/otp',
    router: OtpRouter,
  },
];

routes.forEach(({ path, router }) => {
  AppRouter.use(path, router);
});
