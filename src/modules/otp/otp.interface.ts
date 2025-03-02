import { Model } from 'mongoose';
import { TReasonForRequestingOtp } from './otp.constants';

export type TOtp = {
    email: string;
    reason: TReasonForRequestingOtp;
    otp: string;
    otpExpiry: Date;
    otpCreatedAt: Date;
    isVerified: boolean;
};

export interface IOtpModel extends Model<TOtp> {
    generateOtp(): Promise<string>;
    verifyOtp(otp: string): Promise<boolean>;
}
