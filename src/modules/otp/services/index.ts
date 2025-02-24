import { requestOtpService } from './request-otp.service';
import { verifyOtpService } from './verify-otp.service';

export const OtpServices = {
  requestOtp: requestOtpService,
  verifyOtp: verifyOtpService,
};
