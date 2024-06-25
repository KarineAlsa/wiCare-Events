export interface AuthServices {
    generateToken(userId: string): string;
}