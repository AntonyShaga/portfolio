// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function ContactForm() {
    const [token, setToken] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            // Всегда получаем токен перед первой отправкой
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
                body: JSON.stringify(form),
            });

            if (res.ok) {
                // Обновляем токен из заголовков
                const newToken = res.headers.get('X-New-Token');
                if (newToken) {
                    setToken(newToken);
                }

                toast.success('Сообщение отправлено!');
                setForm({ name: '', email: '', message: '' });
            } else {
                toast.error('Ошибка отправки сообщения. Попробуйте ещё раз.');
            }
        } catch (error) {
            toast.error('Сетевая ошибка. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Ваш Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <textarea
                placeholder="Ваше сообщение"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить сообщение'}
            </button>
        </form>
    );
}
