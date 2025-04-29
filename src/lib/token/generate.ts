import { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';
import jwt, { SignOptions } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { isIP } from 'net';
import { tokenConfig } from './config';

export async function generateContactToken(req: NextRequest): Promise<string> {
    const ipHeader = req.headers.get('x-real-ip') ||
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        'unknown';
    const ip = isIP(ipHeader) ? ipHeader : 'invalid';

    if (ip === 'invalid') {
        throw new Error('Invalid IP address');
    }

    // Rate-limiting проверка
    const redisRateLimitKey = `rate_limit:contact_token:${ip}`;
    const currentCount = await redis.incr(redisRateLimitKey);

    if (currentCount === 1) {
        await redis.expire(redisRateLimitKey, tokenConfig.rateLimitWindow);
    }

    const isTrustedIP = process.env.TRUSTED_IPS?.split(',').includes(ip);
    if (!isTrustedIP && currentCount > tokenConfig.rateLimitMaxRequests) {
        await redis.expire(redisRateLimitKey, tokenConfig.rateLimitWindow * 2);
        throw new Error('Too many token generation requests');
    }

    const jti = randomUUID();
    const payload = {
        jti,
        iss: 'contact-service',
        aud: ['contact-form', 'web-app'],
        iat: Math.floor(Date.now() / 1000),
        ip
    };

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    const signOptions: SignOptions = {
        expiresIn: tokenConfig.expiration,
        algorithm: tokenConfig.algorithm,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions);

    await redis.set(`contact_token:${jti}`, JSON.stringify({
        status: 'valid',
        createdAt: new Date().toISOString(),
        ip,
        userAgent: req.headers.get('user-agent') || 'unknown',
        rateLimitCount: currentCount
    }), 'EX', tokenConfig.redisExpiration);

    return token;
}
