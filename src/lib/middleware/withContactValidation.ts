/*
import { NextRequest, NextResponse } from 'next/server';
import { validateContactToken } from '../validateContactToken';

export function withContactValidation(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
        try {
            await validateContactToken(req);
            return await handler(req);
        } catch (error) {
            return NextResponse.json({ error: (error as Error).message }, { status: 401 });
        }
    };
}
*/
