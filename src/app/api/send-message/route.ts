import { NextRequest, NextResponse } from 'next/server';
import { withContactValidation } from '@/lib/middleware/withContactValidation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

function generateEmailHtml(data: ContactFormData): string {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">Новое сообщение с сайта</h1>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    </div>
  `;
}

async function handler(req: NextRequest) {
    const data: ContactFormData = await req.json();

    try {
        const emailResponse = await resend.emails.send({
            from:process.env.FROM_EMAIL as string,
            to:  process.env.TO_EMAIL as string,
            subject: 'Новое сообщение с лендинга',
            html: generateEmailHtml(data),
        });

        if (emailResponse.error) {
            console.error('Resend error:', emailResponse.error);
            return NextResponse.json(
                { success: false, message: 'Ошибка при отправке письма' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Письмо успешно отправлено' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка сервера' },
            { status: 500 }
        );
    }
}

export const POST = withContactValidation(handler);
