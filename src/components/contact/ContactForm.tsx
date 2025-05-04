'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactFeedback, ContactFormI } from "@/types/dictionary";
import Button from "@/components/ui/Button";

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
            toast.error(network);
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full justify-between gap-2">
            <div >
                <input
                    {...register('name')}
                    placeholder={namePlaceholderForm}
                    className={ `w-full border p-1  rounded-md focus:border-neutral-400 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'}`}
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
                    className={`w-full border p-1  rounded-md focus:border-neutral-400 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'}`}
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
                        ${errors.message ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'}
                        resize-none w-full border p-1  rounded-md focus:border-neutral-400 focus:outline-none
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

            <Button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                variant={"danger"}
            >
                {loading ? sendingForm : submitForm}
            </Button>
        </form>
    );
}
