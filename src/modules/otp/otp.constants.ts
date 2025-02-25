export const reasonForRequestingOtp = {
    VERIFY_EMAIL: 'verify-email',
    FORGOT_PASSWORD: 'forgot-password',
    CHANGE_EMAIL: 'change-email',
} as const;

export type TReasonForRequestingOtp =
    (typeof reasonForRequestingOtp)[keyof typeof reasonForRequestingOtp];
