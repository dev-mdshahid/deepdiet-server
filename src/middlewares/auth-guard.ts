import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catch-async';
import { AppError } from '../error/app-error';
import { verifyToken } from '../modules/auth/auth.utils';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';
import { AuthUserModel } from '../modules/auth/auth.model';

export const AuthGuard = (role: TUserRole) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const { accessToken, refreshToken } = req.cookies;
            if (!accessToken) {
                throw new AppError(401, 'Token not found!');
            }

            const accessTokenDecoded = verifyToken(
                accessToken,
                config.jwt_access_token_secret as string
            );

            const refreshTokenDecoded = verifyToken(
                refreshToken,
                config.jwt_refresh_token_secret as string
            );

            const user = await AuthUserModel.findOne({
                email: accessTokenDecoded.email,
            });

            const lastPasswordChangedAt = new Date(
                user?.passwordLastChangedAt!
            );
            const accessTokenJwtIssuedAt = new Date(
                accessTokenDecoded.iat! * 1000
            );
            const refreshTokenJwtIssuedAt = new Date(
                refreshTokenDecoded.iat! * 1000
            );

            const unAuthorized =
                !user ||
                accessTokenDecoded.role !== role ||
                refreshTokenDecoded.role !== role ||
                lastPasswordChangedAt > accessTokenJwtIssuedAt ||
                lastPasswordChangedAt > refreshTokenJwtIssuedAt;

            if (unAuthorized) {
                throw new AppError(401, 'Unauthorized resource!');
            }

            next();
        }
    );
};
