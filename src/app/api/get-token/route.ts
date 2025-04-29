import { NextRequest, NextResponse } from 'next/server';
import { generateContactToken } from '@/lib/token/generate';
import { tokenConfig } from "@/lib/token/config";

// Кастомный тип для ошибки
type AppError = Error & {
    message: string;
    code?: string;
    statusCode?: number;
};

export async function GET(request: NextRequest) {
    try {
        const token = await generateContactToken(request);
        return NextResponse.json({ token }, {
            headers: {
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff'
            }
        });
    } catch (error: unknown) {
        console.error('Token generation failed:', error);

        // Проверяем, является ли ошибка объектом Error
        if (error instanceof Error) {
            // Обрабатываем rate limit ошибку
            if (error.message === 'Too many token generation requests') {
                return NextResponse.json(
                    { error: 'Too many requests' },
                    {
                        status: 429,
                        headers: { 'Retry-After': tokenConfig.rateLimitWindow.toString() }
                    }
                );
            }

            // Обрабатываем другие известные ошибки
            return NextResponse.json(
                { error: error.message || 'Token generation failed' },
                { status: (error as AppError).statusCode || 500 }
            );
        }

        // Фолбэк для неизвестных ошибок
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
