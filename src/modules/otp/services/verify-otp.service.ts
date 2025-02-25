import { AppError } from '../../../error/app-error';
import { reasonForRequestingOtp } from '../otp.constants';
import { OtpModel } from '../otp.model';

export const verifyOtpService = async (email: string, otp: string) => {
    const otpRecord = await OtpModel.findOne({
        email,
        otp,
        isVerified: false,
        otpExpiry: { $gt: Date.now() },
    });
    if (!otpRecord) {
        throw new AppError(404, 'Invalid or expired OTP');
    }
    otpRecord.isVerified = true;

    if (otpRecord.reason === reasonForRequestingOtp.VERIFY_EMAIL) {
        await otpRecord.save();
    } else {
        await otpRecord.deleteOne();
    }
    return {
        isVerified: true,
    };
};
