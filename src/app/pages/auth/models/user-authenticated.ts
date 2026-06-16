export interface UserAuthenticated {
    nameidentifier: string;
    emailaddress: string;
    role: string;
    exp: number;
    iss: string;
    aud: string;
    token: string;
}