import validate from 'deep-email-validator';

export const deepValidateEmail = async (email: string) => {
    const res = await validate(email);
    return res;
};
