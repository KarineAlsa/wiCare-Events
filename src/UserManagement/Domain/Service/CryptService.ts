export interface CryptServices {
    generateCrypt(data: string): string;
    decrypt(data: string): string;
}