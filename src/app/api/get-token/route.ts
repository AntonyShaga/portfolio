import {NextResponse} from 'next/server';
import {redis} from '@/lib/redis';
import jwt from 'jsonwebtoken';
import {randomUUID} from 'crypto';

const JWT_ALGORITHM = 'HS256';
const TOKEN_EXPIRATION = '10m';
const REDIS_EXPIRATION = 600; // 10 минут в секундах

export async function GET() {

    try {
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
