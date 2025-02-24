import { z } from "zod";

const SRequestOtpValidation = z.object({
    email: z.string().email(),
    checkUserUnique: z.boolean().optional()
})

const SVerifyOtpValidation = z.object({
    email: z.string().email(),
    otp: z.string(),
})  

export const OtpValidationSchema = {
    requestOtp: SRequestOtpValidation,
    verifyOtp: SVerifyOtpValidation,
}