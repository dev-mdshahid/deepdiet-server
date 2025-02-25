import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { sendSuccessResponse } from '../../../utils/send-response';
import { verifyOtpService } from '../services/verify-otp.service';

export const verifyOtpController = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        await verifyOtpService(data.email, data.otp);

        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'OTP verified successfully!',
            data: {},
        });
    }
);
