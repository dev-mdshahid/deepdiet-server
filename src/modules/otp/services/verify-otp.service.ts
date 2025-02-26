import config from '../../../config';
import { AppError } from '../../../error/app-error';
import { generateToken } from '../../auth/auth.utils';
import { OtpModel } from '../otp.model';
import { OtpValidationSchema } from '../otp.validation';

export const verifyOtpService = async (email: string, otp: string) => {
    // verifying by the matched otp
    const otpRecord = await OtpModel.findOne({
        email,
        otp,
        isVerified: false,
        otpExpiry: { $gt: Date.now() },
    });
    if (!otpRecord) {
        throw new AppError(401, 'Invalid or expired OTP');
    }

    // generating the session token
    const tokenPayload = OtpValidationSchema.requestOtp.parse(otpRecord);
    const sessionToken = generateToken(
        tokenPayload,
        config.jwt_session_token_secret as string,
        Number(config.jwt_session_token_expiry_in_minutes)
    );

    // deleting otp
    await otpRecord.deleteOne();

    return {
        sessionToken,
    };
};
