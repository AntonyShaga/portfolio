import {NextResponse} from 'next/server';
import {redis} from '@/lib/redis';
import jwt from 'jsonwebtoken';
import {randomUUID} from 'crypto';

const JWT_ALGORITHM = 'HS256';
const TOKEN_EXPIRATION = '10m';
const REDIS_EXPIRATION = 600;
const RATE_LIMIT_WINDOW = 60; // 1 минута (в секундах)
const RATE_LIMIT_MAX_REQUESTS = 10; // Макс. 10 запросов в минуту

export async function GET(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    const redisKey = `rate_limit:contact_token:${ip}`;

    try {

        // Проверяем rate-limiting
        const currentCount = await redis.incr(redisKey);
        if (currentCount === 1) {
            await redis.expire(redisKey, RATE_LIMIT_WINDOW);
        }

        if (currentCount > RATE_LIMIT_MAX_REQUESTS) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 } // HTTP 429 Too Many Requests
            );
        }

        const jti = randomUUID();
        const payload = {
            jti,
            iss: 'contact-service',
            aud: 'contact-form'
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: TOKEN_EXPIRATION,
            algorithm: JWT_ALGORITHM,
        });


        await redis.set(`contact_token:${jti}`, JSON.stringify({
            status: 'valid',
            createdAt: Date.now()
        }), 'EX', REDIS_EXPIRATION);

        return NextResponse.json({ token });
    } catch (error) {
        console.error('Token generation error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
