import { NextRequest } from 'next/server';
import { redis } from './redis';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

/**
 * Schema for the JWT token payload.
 * Expects a `jti` (JWT ID) field as a string.
 */
export const TokenSchema = z.object({
    jti: z.string(),
});

export type ContactTokenPayload = z.infer<typeof TokenSchema>;

/**
 * Custom error class for token validation failures.
 * Includes:
 * - `message`: Human-readable error description.
 * - `code`: Machine-readable error code (e.g., 'MISSING_TOKEN').
 * - `statusCode`: Suggested HTTP status code (default: 401).
 */
export class TokenValidationError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly statusCode: number = 401
    ) {
        super(message);
    }
}

/**
 * Validates a one-time contact token from the request headers.
 *
 * ### Flow:
 * 1. Extracts token from `Authorization: Bearer <token>` header.
 * 2. Verifies JWT signature and expiration using `JWT_SECRET`.
 * 3. Checks if token exists in Redis (preventing reuse).
 * 4. Deletes the token from Redis on success.
 *
 * ### Error Cases:
 * - `MISSING_TOKEN` (401): No token provided.
 * - `CONFIG_ERROR` (500): Missing `JWT_SECRET` env variable.
 * - `TOKEN_EXPIRED` (401): JWT is expired.
 * - `INVALID_TOKEN` (401): JWT is malformed or Redis lookup failed.
 * - `INVALID_PAYLOAD` (401): Token payload doesn't match `TokenSchema`.
 * - `VALIDATION_ERROR` (500): Unexpected error (e.g., Redis failure).
 *
 * @example
 * ```ts
 * try {
 *   await validateContactToken(request);
 *   // Proceed with contact logic...
 * } catch (err) {
 *   if (err instanceof TokenValidationError) {
 *     return new Response(err.message, { status: err.statusCode });
 *   }
 * }
 * ```
 */
export async function validateContactToken(req: NextRequest): Promise<void> {
    // 1. Extract token
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        throw new TokenValidationError('Token is missing', 'MISSING_TOKEN', 401);
    }

    // 2. Check config
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new TokenValidationError('JWT_SECRET is not set', 'CONFIG_ERROR', 500);
    }

    try {
        // 3. Verify JWT
        const decoded = TokenSchema.parse(
            jwt.verify(token, jwtSecret)
        );

        // 4. Check Redis
        const key = `contact_token:${encodeURIComponent(decoded.jti)}`;
        const exists = await redis.get(key);
        if (!exists) {
            throw new TokenValidationError('Token expired or invalid', 'INVALID_TOKEN', 401);
        }

        // 5. Invalidate token
        await redis.del(key).catch(err => {
            console.error('Failed to delete token from Redis:', err, { key });
        });

    } catch (error) {
        // Handle known errors
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenValidationError('Token expired', 'TOKEN_EXPIRED', 401);
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw new TokenValidationError('Invalid token', 'INVALID_TOKEN', 401);
        }

        if (error instanceof z.ZodError) {
            console.error('Token payload validation failed:', error.errors);
            throw new TokenValidationError('Invalid token payload', 'INVALID_PAYLOAD', 401);
        }

        // Fallback
        console.error('Unexpected error:', error);
        throw new TokenValidationError('Token validation failed', 'VALIDATION_ERROR', 500);
    }
}
