import { AppError } from "../../../error/app-error";
import { OtpModel } from "../otp.model";

export const verifyOtpService = async (email: string, otp: string) => {
    const otpRecord = await OtpModel.findOne({ email, otp, isVerified: false, otpExpiry: { $gt: Date.now() } });
    if (!otpRecord) {
        throw new AppError(404, 'Invalid or expired OTP');
    }
    otpRecord.isVerified = true;
    await otpRecord.save();
    return otpRecord;
}