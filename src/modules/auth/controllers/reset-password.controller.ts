import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { AuthServices } from '../services';
import { sendSuccessResponse } from '../../../utils/send-response';
import { AppError } from '../../../error/app-error';
import { clearAllTokens } from '../auth.utils';

export const resetPasswordController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        req;
        const { sessionToken } = req.cookies;
        if (!sessionToken) {
            throw new AppError(401, 'Session token not found!');
        }

        const userData = req.body;
        const user = await AuthServices.resetPassword(userData, sessionToken);

        clearAllTokens(res);
        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'Password updated successfully!',
            data: user || {},
        });
    }
);
