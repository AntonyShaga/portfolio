'use client';

import { useEffect, useState } from 'react';
import {toast} from "sonner";

export function ContactForm() {
    const [token, setToken] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchToken() {
            try {
                const res = await fetch('/api/get-token');
                if (!res.ok) {
                    const errorMessage = res.status === 429
                        ? 'Слишком много запросов. Попробуйте позже.'
                        : 'Ошибка при получении токена.';

                    toast.error(errorMessage);
                    return;
                }

                const data = await res.json();
                setToken(data.token);
            } catch  {
                toast.error('Сетевая ошибка. Попробуйте позже.');
            }
        }

        fetchToken();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!token) {
            alert('Форма устарела. Пожалуйста обновите страницу.');
            toast.error('Форма устарела. Пожалуйста обновите страницу.')
            return;
        }

        setLoading(true);

        const res = await fetch('/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });

        setLoading(false);

        if (res.ok) {
            alert('Сообщение отправлено!');
            toast.success('Сообщение отправлено!')
            setForm({ name: '', email: '', message: '' });
        } else {
            alert('Ошибка отправки сообщения. Попробуйте ещё раз.');
            toast.error('Ошибка отправки сообщения. Попробуйте ещё раз.')
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
