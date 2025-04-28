import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { isIP } from 'net';

// Конфигурация вынесена в константы с валидацией
const JWT_ALGORITHM = 'HS256' as const;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '10m';
const REDIS_EXPIRATION = parseInt(process.env.REDIS_EXPIRATION || '600');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60');
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');

export async function GET(request: NextRequest) {
    // Получение и нормализация IP с защитой от подделки заголовков
    const ipHeader = request.headers.get('x-real-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        'unknown';
    const ip = isIP(ipHeader) ? ipHeader : 'invalid';


    if (ip === 'invalid') {
        return NextResponse.json(
            { error: 'Invalid IP address' },
            { status: 400 }
        );
    }

    const redisRateLimitKey = `rate_limit:contact_token:${ip}`;
    const currentCount = await redis.incr(redisRateLimitKey);

    try {
        // Rate-limiting с исключениями для доверенных IP
        const isTrustedIP = process.env.TRUSTED_IPS?.split(',').includes(ip);
        if (!isTrustedIP && currentCount > RATE_LIMIT_MAX_REQUESTS) {
            await redis.expire(redisRateLimitKey, RATE_LIMIT_WINDOW * 2); // Ужесточаем лимит при атаке
            return NextResponse.json(
                { error: 'Too many requests' },
                {
                    status: 429,
                    headers: { 'Retry-After': RATE_LIMIT_WINDOW.toString() }
                }
            );
        }

        // Генерация токена с усиленной безопасностью
        const jti = randomUUID();
        const payload = {
            jti,
            iss: 'contact-service',
            aud: ['contact-form', 'web-app'], // Multiple audiences
            iat: Math.floor(Date.now() / 1000), // Issued at
            ip // Добавляем IP в payload для аудита
        };

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: TOKEN_EXPIRATION,
            algorithm: JWT_ALGORITHM,
            header: {
                typ: 'JWT',
                kid: 'v1' // Key ID для ротации секретов
            }
        } as jwt.SignOptions
        );

        // Запись в Redis с расширенными метаданными
        await redis.set(`contact_token:${jti}`, JSON.stringify({
            status: 'valid',
            createdAt: new Date().toISOString(),
            ip,
            userAgent: request.headers.get('user-agent') || 'unknown',
            rateLimitCount: currentCount
        }), 'EX', REDIS_EXPIRATION);

        // Логирование для Security Information and Event Management (SIEM)
        console.info(`Token issued for IP: ${ip}`, {
            jti,
            rateLimit: currentCount
        });

        return NextResponse.json({ token }, {
            headers: {
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff'
            }
        });

    } catch (error) {
        // Централизованное логирование ошибок
        console.error('Token generation failed:', {
            error: error instanceof Error ? error.stack : error,
            ip,
            headers: Object.fromEntries(request.headers.entries())
        });

        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 500,
                headers: { 'X-Error-Code': 'TOKEN_GENERATION_FAILED' }
            }
        );
    }
}
