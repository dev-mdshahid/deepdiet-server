import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    email_host: process.env.EMAIL_HOST,
    email_port: Number(process.env.EMAIL_PORT),
    email_secure: process.env.EMAIL_SECURE === 'true',
    email_username: process.env.EMAIL_USERNAME,
    email_password: process.env.EMAIL_PASSWORD,
};
