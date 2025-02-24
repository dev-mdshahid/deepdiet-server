import { AppError } from '../../../error/app-error';
import { AuthUserModel } from '../../auth/auth.model';
import { OtpModel } from '../otp.model';

export const requestOtpService = async (
  email: string,
  checkUserUnique: boolean = false
) => {
  const isUserExists = await AuthUserModel.findOne({ email });
  if (isUserExists && checkUserUnique) {
    throw new AppError(409, 'User already exists with this email!');
  } else if (isUserExists && !checkUserUnique) {
    const otp = await OtpModel.create({
      email,
    });
    return otp;
  }

  throw new AppError(404, 'User not found!');
};
