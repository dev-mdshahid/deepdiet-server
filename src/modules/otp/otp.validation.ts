import { z } from 'zod';
import {
    reasonForRequestingOtp,
    TReasonForRequestingOtp,
} from './otp.constants';

const SRequestOtpValidation = z.object({
    email: z.string().email(),
    reason: z.enum(
        Object.values(reasonForRequestingOtp) as [TReasonForRequestingOtp]
    ),
});

const SVerifyOtpValidation = z.object({
    email: z.string().email(),
    otp: z.string(),
});

export const OtpValidationSchema = {
    requestOtp: SRequestOtpValidation,
    verifyOtp: SVerifyOtpValidation,
};
