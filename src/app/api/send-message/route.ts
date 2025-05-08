import { NextRequest, NextResponse } from 'next/server';
import { withContactValidation } from '@/lib/middleware/withContactValidation';
import { Resend } from 'resend';
import { generateContactToken } from '@/lib/token/generate';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Processes raw contact form submission (without token validation)
 * @param {NextRequest} req - Request containing:
 *   - name: string
 *   - email: string (valid email format)
 *   - message: string
 * @returns {Promise<NextResponse>} Response with:
 *   - success: boolean
 *   - message: string (user-friendly status)
 *   - status: 200|500
 * @throws {Error} Only for unexpected Resend API failures
 */
async function baseHandler(req: NextRequest) {
  const data = await req.json();
  const { name, email, message } = data;

  try {
    const emailResponse = await resend.emails.send({
      from: `Portfolio <contact@resend.dev>`,
      to: process.env.TO_EMAIL as string,
      subject: 'New message from landing page',
      html: `
                <h1>New message</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
    });

    if (emailResponse.error) {
      return NextResponse.json(
        { success: false, message: 'Ошибка при отправке письма' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: 'Письмо успешно отправлено' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }
}

/**
 * Secure contact form submission endpoint
 *
 * ### Flow:
 * 1. Validates JWT via withContactValidation middleware
 * 2. Processes form data via baseHandler
 * 3. Generates new token (successful submissions only)
 *
 * ### Security:
 * - Rate-limited token generation
 * - One-time use tokens
 * - IP-based abuse protection
 *
 * @param {NextRequest} req - Authenticated request with:
 *   - Valid JWT in Authorization header
 *   - Form data in body
 * @returns {Promise<NextResponse>} Response with:
 *   - success: boolean
 *   - message: string
 *   - status: 200|401|429|500
 *   - X-New-Token header (on success)
 */
export const POST = withContactValidation(async (req: NextRequest) => {
  const response = await baseHandler(req);

  if (response.status === 200) {
    const newToken = await generateContactToken(req);
    response.headers.set('X-New-Token', newToken);
  }

  return response;
});
