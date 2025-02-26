import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { AppError } from '../../../error/app-error';
import { AuthServices } from '../services';
import config from '../../../config';
import { sendSuccessResponse } from '../../../utils/send-response';

export const refreshTokenController = catchAsync(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw new AppError(401, 'Refresh token not found!');
        }

        const accessToken = await AuthServices.refreshToken(refreshToken);
        res.cookie('accessToken', accessToken, {
            secure: false,
            httpOnly: false,
            maxAge: config.jwt_access_token_expiry_in_minutes * 60 * 1000,
        });

        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'Access token has been set successfully!',
            data: {},
        });
    }
);
