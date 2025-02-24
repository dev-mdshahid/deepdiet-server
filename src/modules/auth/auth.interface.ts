export enum TUserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export type TAuthUser = {
    username: string;
    email: string;
    role: TUserRole;
    password: string;
}