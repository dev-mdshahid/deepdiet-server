import { Request, Response } from 'express';
import { OtpServices } from '../services';
import { sendSuccessResponse } from '../../../utils/send-response';
import { catchAsync } from '../../../utils/catch-async';
import { OtpValidationSchema } from '../otp.validation';
import { z } from 'zod';

export const requestOtpController = catchAsync(
    async (req: Request, res: Response) => {
        const data: z.infer<typeof OtpValidationSchema.requestOtp> = req.body;
        await OtpServices.requestOtp(data.email, data.reason);

        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'OTP sent successfully!',
            data: {},
        });
    }
);
