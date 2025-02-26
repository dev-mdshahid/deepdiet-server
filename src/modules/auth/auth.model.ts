import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TAuthUser, TUserRole } from './auth.interface';
import config from '../../config';

export const SAuthUser = new Schema<TAuthUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        role: {
            type: String,
            enum: Object.values(TUserRole),
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        passwordLastChangedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

// encrypting the password
SAuthUser.pre('save', async function (next) {
    const user = this as TAuthUser;
    if (user.password) {
        user.password = await bcrypt.hash(
            user.password,
            Number(config.bcrypt_salt_rounds)
        );
    }
    next();
});

// removing the password from the output
SAuthUser.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

// model creation
export const AuthUserModel = model<TAuthUser>('authUser', SAuthUser);
