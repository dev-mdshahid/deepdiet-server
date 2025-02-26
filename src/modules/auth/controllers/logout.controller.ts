import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { clearAllTokens } from '../auth.utils';
import { sendSuccessResponse } from '../../../utils/send-response';

export const logoutController = catchAsync(
    async (req: Request, res: Response) => {
        clearAllTokens(res);
        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'Logged out successfully!',
            data: {},
        });
    }
);
