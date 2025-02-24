import { Router } from 'express';
import { OtpControllers } from './controllers';
import { OtpValidationSchema } from './otp.validation';
import { ValidateRequest } from '../../middlewares/validate-request';

export const OtpRouter = Router();

OtpRouter.post('/request-otp', ValidateRequest(OtpValidationSchema.requestOtp), OtpControllers.requestOtp);
OtpRouter.post('/verify-otp', ValidateRequest(OtpValidationSchema.verifyOtp), OtpControllers.verifyOtp);
