import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { AuthServices } from '../services';
import { sendSuccessResponse } from '../../../utils/send-response';
import { AppError } from '../../../error/app-error';

export const registerUserController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { sessionToken } = req.cookies;
        console.log(req.cookies);
        if (!sessionToken) {
            throw new AppError(401, 'Session token not found!');
        }

        const userData = req.body;
        const user = await AuthServices.registerUser(userData, sessionToken);

        // clear the session token
        res.clearCookie('sessionToken');

        sendSuccessResponse(res, {
            statusCode: 201,
            message: 'User registered successfully',
            data: user,
        });
    }
);
