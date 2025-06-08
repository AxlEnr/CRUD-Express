import { envs } from "../../config"
import jwt from 'jsonwebtoken';

export class JwtService {
    private static readonly SECRET = envs.JWT_SEED;

    static generateToken(payload: object): string {
        return  jwt.sign(payload, this.SECRET, { expiresIn: "2d" });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.SECRET);
        } catch (error) {
            throw new Error("Token verification failed");
        }
    }

}