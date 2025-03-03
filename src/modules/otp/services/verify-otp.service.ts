import config from '../../../config';
import { AppError } from '../../../error/app-error';
import { generateToken } from '../../auth/auth.utils';
import { OtpModel } from '../otp.model';
import { OtpValidationSchema } from '../otp.validation';
import crypto from 'crypto';

export const verifyOtpService = async (email: string, otp: string) => {
    // verifying by the matched otp
    const otpRecord = await OtpModel.findOne({
        email,
        otp,
        isVerified: false,
    });

    if (otpRecord) {
        const isValidOTP = crypto.timingSafeEqual(
            Buffer.from(otp),
            Buffer.from(otpRecord.otp)
        );
        const isNotExpired =
            new Date().getTime() < new Date(otpRecord.expiresAt).getTime();

        if (!isValidOTP) {
            throw new AppError(401, 'Invalid OTP');
        } else if (!isNotExpired) {
            throw new AppError(401, 'Expired OTP');
        }
    } else {
        throw new AppError(401, 'OTP not found ');
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
