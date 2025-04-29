import { NextRequest, NextResponse } from 'next/server';
import { withContactValidation } from '@/lib/middleware/withContactValidation';
import { Resend } from 'resend';
import {generateContactToken} from "@/lib/token/generate";

const resend = new Resend(process.env.RESEND_API_KEY);

async function baseHandler(req: NextRequest) {
    const data = await req.json();
    const { name, email, message } = data;

    try {
        const emailResponse = await resend.emails.send({
            from: `Portfolio <contact@resend.dev>`,
            to: process.env.TO_EMAIL as string,
            subject: 'Новое сообщение с лендинга',
            html: `
        <h1>Новое сообщение</h1>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
      `,
        });

        if (emailResponse.error) {
            return NextResponse.json(
                { success: false, message: 'Ошибка при отправке письма' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Письмо успешно отправлено' },
            { status: 200 }
        );
    } catch  {
        return NextResponse.json(
            { success: false, message: 'Ошибка сервера' },
            { status: 500 }
        );
    }
}

export const POST = withContactValidation(async (req: NextRequest) => {
    const response = await baseHandler(req);

    if (response.status === 200) {
        // Используем ту же функцию генерации токена
        const newToken = await generateContactToken(req);
        response.headers.set('X-New-Token', newToken);
    }

    return response;
})
