import { TReasonForRequestingOtp } from './otp.constants';

export type TOtp = {
    email: string;
    reason: TReasonForRequestingOtp;
    otp: string;
    otpExpiry: Date;
    otpCreatedAt: Date;
    isVerified: boolean;
};
