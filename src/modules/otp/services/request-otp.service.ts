import nodemailer from 'nodemailer';
import { AppError } from '../../../error/app-error';
import { AuthUserModel } from '../../auth/auth.model';
import { OtpModel } from '../otp.model';
import { requestOtpTemplate } from '../otp.templates';
import {
    reasonForRequestingOtp,
    TReasonForRequestingOtp,
} from '../otp.constants';

export const requestOtpService = async (
    email: string,
    reason: TReasonForRequestingOtp
) => {
    const isUserExists = await AuthUserModel.findOne({ email });
    const emailNeedsToBeUnique =
        reason === reasonForRequestingOtp.VERIFY_EMAIL ||
        reason === reasonForRequestingOtp.CHANGE_EMAIL;

    if (emailNeedsToBeUnique && isUserExists) {
        throw new AppError(409, 'User already exists with this email!');
    } else if (
        (emailNeedsToBeUnique && !isUserExists) ||
        (!emailNeedsToBeUnique && isUserExists)
    ) {
        // generating the otp
        const otp = await OtpModel.generateOtp();

        const savedOtp = await OtpModel.create({
            email,
            reason,
            otp,
        });

        if (savedOtp._id) {
            // setup nodemailer
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                secure: process.env.EMAIL_SECURE === 'true', // true for port 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            // mail options
            const mailOptions = {
                from: `"DeepDiet 😍" <${process.env.EMAIL_USERNAME}>`,
                to: email,
                subject: 'Your OTP from DeepDiet',
                text: savedOtp.otp,
                html: requestOtpTemplate(savedOtp, reason),
            };
            await transporter.sendMail(mailOptions);
            return savedOtp;
        } else {
            throw new AppError(500, 'Failed to send OTP!');
        }
    }

    throw new AppError(404, 'User not found!');
};
