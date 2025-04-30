'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

/**
 * Form validation schema using Zod
 * @constant
 * @type {z.ZodObject}
 * @property {z.ZodString} name - 2-50 characters
 * @property {z.ZodString} email - Valid email format, max 100 chars
 * @property {z.ZodString} message - 10-1000 characters
 */
const formSchema = z.object({
    name: z.string()
        .min(2, 'Имя слишком короткое (минимум 2 символа)')
        .max(50, 'Имя слишком длинное (максимум 50 символов)'),
    email: z.string()
        .email('Введите корректный email')
        .max(100, 'Email слишком длинный'),
    message: z.string()
        .min(10, 'Сообщение слишком короткое (минимум 10 символов)')
        .max(1000, 'Сообщение слишком длинное (максимум 1000 символов)')
});

type FormData = z.infer<typeof formSchema>;

/**
 * Secure contact form component with JWT token validation
 * @component
 * @description Handles form submission with client-side validation,
 * token management, and error handling
 *
 * @example
 * <ContactForm />
 *
 * @returns {JSX.Element} Accessible contact form with validation
 */
export function ContactForm() {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * React Hook Form initialization
     * @type {UseFormReturn<FormData>}
     */
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    /**
     * Fetches new JWT token from API
     * @async
     * @function
     * @returns {Promise<string|null>} Token string or null on failure
     */
    async function getToken() {
        try {
            const res = await fetch('/api/get-token');
            if (!res.ok) {
                const errorMessage = res.status === 429
                    ? 'Слишком много запросов. Попробуйте позже.'
                    : 'Ошибка при получении токена.';
                toast.error(errorMessage);
                return null;
            }
            return (await res.json()).token as string;
        } catch {
            toast.error('Сетевая ошибка. Попробуйте позже.');
            return null;
        }
    }

    /**
     * Handles form submission
     * @async
     * @function
     * @param {FormData} data - Validated form data
     */
    const onSubmit = async (data: FormData) => {
        setLoading(true);

        try {
            const currentToken = token || await getToken();
            if (!currentToken) {
                setLoading(false);
                return;
            }

            const res = await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const newToken = res.headers.get('X-New-Token');
                if (newToken) setToken(newToken);

                toast.success('Сообщение отправлено!');
                reset();
            } else {
                toast.error('Ошибка отправки сообщения. Попробуйте ещё раз.');
            }
        } catch {
            toast.error('Сетевая ошибка. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
            <div>
                <input
                    {...register('name')}
                    placeholder="Ваше имя"
                    className={errors.name ? 'border-red-500' : ''}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm" role="alert">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Ваш Email"
                    className={errors.email ? 'border-red-500' : ''}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm" role="alert">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
        <textarea
            {...register('message')}
            placeholder="Ваше сообщение"
            className={errors.message ? 'border-red-500' : ''}
            aria-invalid={!!errors.message}
        />
                {errors.message && (
                    <p className="text-red-500 text-sm" role="alert">
                        {errors.message.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={loading ? 'opacity-50 cursor-not-allowed' : ''}
                aria-busy={loading}
            >
                {loading ? 'Отправка...' : 'Отправить сообщение'}
            </button>
        </form>
    );
}
