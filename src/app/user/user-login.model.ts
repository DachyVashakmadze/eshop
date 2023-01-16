export interface User {
    email: string;
    name: string;
    avatar: string
}

export interface UserLogin{
    token: string,
    user: User,
}