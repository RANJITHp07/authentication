import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

// Middleware function to verify JWT token
function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
}

export default verifyToken;
