import { Request, Response } from 'express';
import { OtpServices } from '../services';
import { sendSuccessResponse } from '../../../utils/send-response';
import { catchAsync } from '../../../utils/catch-async';

export const requestOtpController = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const otp = await OtpServices.requestOtp(data.email, data.checkUserUnique);

    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'OTP sent successfully!',
      data: {},
    });
  }
);
