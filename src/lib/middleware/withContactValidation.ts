import { NextRequest, NextResponse } from 'next/server';
import { validateContactToken, TokenValidationError } from '../validateContactToken';

/**
 * HOC для валидации контактного токена
 * @param handler Основной обработчик маршрута
 * @returns Обработчик с проверкой токена
 * @throws {TokenValidationError} 401 при ошибке валидации
 */
export function withContactValidation(
    handler: (req: NextRequest) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            console.log(`[Auth] Validating contact token for ${req.url}`);
            await validateContactToken(req);
            return await handler(req);
        } catch (error) {
            if (error instanceof TokenValidationError) {
                console.warn(`[Auth] Validation failed: ${error.code}`);
                return NextResponse.json(
                    { error: error.message, code: error.code },
                    { status: error.statusCode }
                );
            }
            console.error('[Auth] Unexpected error:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
}
