import {NextResponse} from 'next/server';
import {redis} from '@/lib/redis';
import jwt from 'jsonwebtoken';
import {randomUUID} from 'crypto';

export async function GET() {
    const jti = randomUUID();
    const token = jwt.sign({ jti }, process.env.JWT_SECRET!, { expiresIn: '10m' });

    // Сохраняем токен в Redis
    await redis.set(`contact_token:${jti}`, 'valid', 'EX', 600); // 10 минут

    return NextResponse.json({ token });
}
