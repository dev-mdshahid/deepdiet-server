import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { AuthServices } from '../services';
import { sendSuccessResponse } from '../../../utils/send-response';
import config from '../../../config';

export const loginController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body;
        const user = await AuthServices.login(
            userData.email,
            userData.password
        );

        // set the cookies
        res.cookie('accessToken', user.accessToken, {
            secure: false,
            httpOnly: false,
            maxAge: config.jwt_access_token_expiry_in_minutes * 60 * 1000,
        });
        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: config.jwt_refresh_token_expiry_in_minutes * 60 * 1000,
        });

        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'Logged in successfully!',
            data: {
                email: user.email,
                role: user.role,
                username: user.username,
            },
        });
    }
);
