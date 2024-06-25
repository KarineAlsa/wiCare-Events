import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWTMiddleware {
    private static JWT_SECRET = process.env.SECRET;
    private static blacklist: string[] = [];

    public static async VerifyToken(req: Request, res: Response, next: NextFunction) {
        const headers = req.headers as IncomingHttpHeaders;
        const authHeader = headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const token = authHeader.split(' ')[1];

        if (!JWTMiddleware.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret not configured' });
        }

        if (await JWTMiddleware.isTokenRevoked(token)) {
            return res.status(401).json({ message: 'Token is revoked' });
        }

        try {
            const decodedToken = jwt.verify(token, JWTMiddleware.JWT_SECRET) as { [key: string]: any };
           
            const userId = decodedToken.id; 
            req.params.id = userId;
            
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    public static async addToBlacklist(token: string): Promise<void> {
        JWTMiddleware.blacklist.push(token);
    }

    public static async isTokenRevoked(token: string): Promise<boolean> {
        return JWTMiddleware.blacklist.includes(token);
    }
}

export default JWTMiddleware;