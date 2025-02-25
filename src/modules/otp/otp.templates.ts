import { TOtp } from './otp.interface';
import {
    reasonForRequestingOtp,
    TReasonForRequestingOtp,
} from './otp.constants';

export const requestOtpTemplate = (
    otp: TOtp,
    reason: TReasonForRequestingOtp
) => {
    const titleForVerifyEmail = 'Welcome to a More Organized You ✨';
    const descriptionForVerifyEmail =
        "At MessO AI, we believe that life is better when it's organized. You're just one step away from decluttering your digital (and maybe real) life!";

    const otherReason = reason?.split('-').join(' ').toLowerCase();

    const titleForOtherReasons = `Whoa! Your VIP pass is here! 🗝️`;
    const descriptionForOtherReasons = `We need to verify your identity before performing ${otherReason} actions because even you can't always be trusted with your own secrets!`;
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MessO AI OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
            }
            .container {
                background: #ffffff;
                max-width: 400px;
                width: 100%;
                padding: 24px;
                margin: 10px auto;
                border-radius: 10px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                text-align: center;
                border-top: 4px solid #2563eb;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #1e40af;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }
            .heading {
                font-size: 20px;
                font-weight: 600;
                color: #333;
                margin-bottom: 10px;
            }
            .text {
                font-size: 14px;
                color: #555;
                line-height: 1.6;
            }
            .otp-box {
                font-size: 24px;
                font-weight: bold;
                color: #1e40af;
                background: #eef2ff;
                padding: 12px 24px;
                display: inline-block;
                border-radius: 8px;
                margin: 16px 0;
                letter-spacing: 2px;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            .footer {
                font-size: 12px;
                color: #777;
                margin-top: 20px;
                border-top: 1px solid #ddd;
                padding-top: 12px;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
                font-weight: 500;
            }
            .footer a:hover {
                text-decoration: underline;
            }
            .italic {
                font-style: italic;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <div class="logo">MessO AI</div>
            <h2 class="heading">${
                reason === reasonForRequestingOtp.VERIFY_EMAIL
                    ? titleForVerifyEmail
                    : titleForOtherReasons
            }</h2>
            <p class="text">
            ${
                reason === reasonForRequestingOtp.VERIFY_EMAIL
                    ? descriptionForVerifyEmail
                    : descriptionForOtherReasons
            }             
            </p>

            <p class="text"><strong>Your one-time access code:</strong></p>
            
            <div class="otp-box">${otp.otp}</div>

            <p class="text">
                This code is valid for <strong>5 minutes</strong>. Use it before it expires,  
                because even in an organized world, time waits for no one! ⏳  
            </p>

            <p class="italic">
                If you didn't request this, don't worry—just ignore this email.  
                Your life may still be messy, but at least your security isn't! 🔒  
            </p>

            <div class="footer">
                <p>To a clutter-free future,</p>
                <p><strong>The MessO AI Team</strong></p>
                <p>
                    <a href="mailto:support@messoai.com">support@messoai.com</a> |  
                    <a href="https://messoai.com">messoai.com</a>
                </p>
            </div>
        </div>

    </body>
    </html>
`;
};
