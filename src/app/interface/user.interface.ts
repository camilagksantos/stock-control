export interface IUser {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export interface ISignUpRequest {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IAuthRequest {
    email: string;
    password: string;
}

export interface IAuthResponse {
    authenticated: boolean;
    message: string;
    user?: IUser;
}
