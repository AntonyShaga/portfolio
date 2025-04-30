'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactFeedback, ContactFormI } from "@/types/dictionary";

interface IProps {
    form: ContactFormI;
    feedback: ContactFeedback;
}

export function ContactForm({ form, feedback }: IProps) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        sendingForm,
        emailPlaceholderForm,
        submitForm,
        namePlaceholderForm,
        messagePlaceholderForm,
        formErrors: {
            messageTooLong,
            nameTooLong,
            nameTooShort,
            messageTooShort,
            emailTooLong,
            emailInvalid
        }
    } = form;

    const {
        feedbackToken,
        success,
        network,
        fail
    } = feedback;

    const formSchema = useMemo(() =>
            z.object({
                name: z.string()
                    .min(2, nameTooShort)
                    .max(50, nameTooLong),
                email: z.string()
                    .email(emailInvalid)
                    .max(100, emailTooLong),
                message: z.string()
                    .min(10, messageTooShort)
                    .max(1000, messageTooLong)
            }),
        [nameTooShort, nameTooLong, emailInvalid, emailTooLong, messageTooShort, messageTooLong]
    );

    type FormData = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const getToken = async () => {
        try {
            const res = await fetch('/api/get-token');
            if (!res.ok) {
                const errorMessage = res.status === 429
                    ? feedbackToken.rateLimit
                    : feedbackToken.fail;
                toast.error(errorMessage);
                return null;
            }
            return (await res.json()).token as string;
        } catch {
            toast.error(network); // Используем переданное сообщение об ошибке сети
            return null;
        }
    };

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

                toast.success(success);
                reset();
            } else {
                toast.error(fail);
            }
        } catch {
            toast.error(network);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
            <div >
                <input
                    {...register('name')}
                    placeholder={namePlaceholderForm}
                    className={ `w-full border p-1 rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className=" text-red-500 text-sm" role="alert">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <input
                    {...register('email')}
                    type="email"
                    placeholder={emailPlaceholderForm}
                    className={`w-full border p-1 rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
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
                    placeholder={messagePlaceholderForm}
                    className={`
                        ${errors.message ? 'border-red-500' : 'border-gray-300'}
                        resize-none focus:border-none
                        w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    aria-invalid={!!errors.message}
                    rows={3}
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
                className={`rounded transition-colors ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                aria-busy={loading}
            >
                {loading ? sendingForm : submitForm}
            </button>
        </form>
    );
}
