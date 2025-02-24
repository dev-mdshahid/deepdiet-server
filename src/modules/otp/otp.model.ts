import { model, Schema } from "mongoose";
import crypto from 'crypto';
import { TOtp } from "./otp.interface";

export const SOtp = new Schema<TOtp>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: String,
        default: crypto.randomInt(100000, 999999).toString()
    },
    otpExpiry: {
        type: Date,
        default: Date.now() + 5 * 60000,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
})

export const OtpModel = model<TOtp>('otp', SOtp);