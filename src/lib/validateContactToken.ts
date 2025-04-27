/*
import { NextRequest } from 'next/server';
import { redis } from './redis';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const TokenSchema = z.object({
    jti: z.string(),
});

class TokenValidationError extends Error {
    constructor(message: string, public readonly code: string) {
        super(message);
    }
}

export async function validateContactToken(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        throw new TokenValidationError('Token is missing', 'MISSING_TOKEN');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new TokenValidationError('JWT_SECRET is not set', 'CONFIG_ERROR');
    }

    try {
        const decoded = TokenSchema.parse(jwt.verify(token, jwtSecret));
        const key = `contact_token:${encodeURIComponent(decoded.jti)}`;

        const exists = await redis.get(key);
        if (!exists) {
            throw new TokenValidationError('Token expired or invalid', 'INVALID_TOKEN');
        }

        await redis.del(key).catch(err => {
            console.error('Redis delete failed:', err);
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new TokenValidationError('Token expired', 'TOKEN_EXPIRED');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new TokenValidationError('Invalid token', 'INVALID_TOKEN');
            }
            console.error('Token validation error:', error);
            throw new TokenValidationError('Validation failed', 'VALIDATION_ERROR');
        }

        console.error('Unknown error during validation', error);
        throw new TokenValidationError('Validation failed', 'VALIDATION_ERROR');
    }
}
*/
