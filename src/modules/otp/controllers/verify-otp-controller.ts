import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catch-async';
import { sendSuccessResponse } from '../../../utils/send-response';
import { verifyOtpService } from '../services/verify-otp.service';
import config from '../../../config';
import { tokens } from '../../../constants/tokens';

export const verifyOtpController = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const { sessionToken } = await verifyOtpService(data.email, data.otp);

        res.cookie(tokens.sessionToken, sessionToken, {
            secure: false,
            httpOnly: false,
            maxAge: config.jwt_session_token_expiry_in_minutes * 60 * 1000,
        });

        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'OTP verified successfully!',
            data: {},
        });
    }
);
