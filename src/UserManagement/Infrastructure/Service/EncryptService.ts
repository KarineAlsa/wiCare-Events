import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { CryptServices } from '../../Domain/Service/CryptService';

dotenv.config();

export class Crypt implements CryptServices {
    private readonly key: string;

    constructor() {
        this.key = process.env.SECRET || '';
    }
    
    generateCrypt(data: string): string {
        const iv = crypto.randomBytes(16); 
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
        const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        return iv.toString('base64') + ':' + encrypted.toString('base64');
    }

    decrypt(data: string): string {
        const [iv, encrypted] = data.split(':').map(part => Buffer.from(part, 'base64'));
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    }

}