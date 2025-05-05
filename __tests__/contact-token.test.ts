import { NextRequest } from 'next/server';

import { tokenConfig } from '@/lib/token/config';
import {GET} from "@/app/api/get-token/route";
import {generateContactToken} from "@/lib/token/generate";

jest.mock('@/lib/token/generate', () => ({
    generateContactToken: jest.fn(),
}));

// Можешь также замокать config при необходимости
jest.mock('@/lib/token/config', () => ({
    tokenConfig: { rateLimitWindow: 60 },
}));

describe('GET /api/contact/token', () => {
    const mockRequest = {} as NextRequest;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 with token on success', async () => {
        const mockToken = 'test.token.string';
        (generateContactToken as jest.Mock).mockResolvedValueOnce(mockToken);

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({ token: mockToken });
        expect(response.headers.get('Cache-Control')).toBe('no-store');
        expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    });

    it('should return 429 on rate limit error', async () => {
        (generateContactToken as jest.Mock).mockRejectedValueOnce(
            new Error('Too many token generation requests')
        );

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(429);
        expect(json).toEqual({ error: 'Too many requests' });
        expect(response.headers.get('Retry-After')).toBe(tokenConfig.rateLimitWindow.toString());
    });

    it('should return 500 on general error with message', async () => {
        const error = new Error('Something went wrong');
        (generateContactToken as jest.Mock).mockRejectedValueOnce(error);

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Something went wrong' });
    });

    it('should return 500 on unknown error object', async () => {
        (generateContactToken as jest.Mock).mockRejectedValueOnce({});

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Internal Server Error' });
    });

    it('should return custom statusCode if present in AppError', async () => {
        const error = new Error('Custom error') as Error & { statusCode?: number };
        error.statusCode = 418; // I'm a teapot ☕
        (generateContactToken as jest.Mock).mockRejectedValueOnce(error);

        const response = await GET(mockRequest);
        const json = await response.json();

        expect(response.status).toBe(418);
        expect(json).toEqual({ error: 'Custom error' });
    });
});
