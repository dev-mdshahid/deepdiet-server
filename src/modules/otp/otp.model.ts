import { model, Schema } from 'mongoose';
import crypto from 'crypto';
import { IOtpModel, TOtp } from './otp.interface';
import { reasonForRequestingOtp } from './otp.constants';

export const SOtp = new Schema<TOtp, IOtpModel>({
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
        required: true,
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

SOtp.statics.generateOtp = async function () {
    // Generate 32 bytes (256 bits) of random data for increased entropy
    const buffer = crypto.randomBytes(32);

    // Convert to a hexadecimal string
    const hexString = buffer.toString('hex');

    // Use a cryptographic hash to further randomize the output
    // SHA-256 creates a uniformly distributed hash
    const hash = crypto.createHash('sha256').update(hexString).digest('hex');

    // Convert the first 8 characters of the hash to a number
    // This gives us a much larger random space before applying modulo
    const largeRandomValue = parseInt(hash.substring(0, 8), 16);

    // Map to 6 digits using modulo
    const sixDigitOTP = largeRandomValue % 1000000;

    // Pad with leading zeros to ensure 6 digits
    return sixDigitOTP.toString().padStart(6, '0').toString();
};

export const OtpModel = model<TOtp, IOtpModel>('otp', SOtp);
