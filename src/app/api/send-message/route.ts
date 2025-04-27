import { NextRequest, NextResponse } from 'next/server';
import { withContactValidation } from '@/lib/middleware/withContactValidation';

async function handler(req: NextRequest) {
    const data = await req.json();

    const { name, email, message } = data;

    console.log('Получено сообщение:', { name, email, message });

    return NextResponse.json({ success: true });
}

export const POST = withContactValidation(handler);
