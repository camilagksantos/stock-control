export interface IUser {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ISignUpRequest {
    name: string;
    email: string;
    password: string;
    role: string;
}