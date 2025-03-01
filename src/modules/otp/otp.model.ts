import { model, Schema } from 'mongoose';
import crypto from 'crypto';
import { TOtp } from './otp.interface';
import { reasonForRequestingOtp } from './otp.constants';

export const SOtp = new Schema<TOtp>({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    reason: {
        type: String,
        enum: Object.values(reasonForRequestingOtp),
        required: true,
    },
    otp: {
        type: String,
        default: String(
            crypto.getRandomValues(new Uint32Array(1))[0] % 1000000
        ).padStart(6, '0'),
    },
    otpExpiry: {
        type: Date,
        default: Date.now() + 5 * 60000,
    },
    otpCreatedAt: {
        type: Date,
        default: Date.now(),
        expires: 30 * 60,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

export const OtpModel = model<TOtp>('otp', SOtp);
