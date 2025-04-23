'use client';

import { usePathname } from 'next/navigation';
import {useMemo, useState} from 'react';
import { toast } from 'sonner';
import Button from "@/components/ui/Button";
import {useDictionary} from "@/app/i18n/DictionaryContext";



export default function DownloadResumeButton() {
    const pathname = usePathname();
    const dict = useDictionary();

    const locale = useMemo(() => {
        const parts = pathname.split('/');
        return parts[1] || 'en';
    }, [pathname]);

    const fileName = locale === 'ru'
        ? '/resume/Anton-Resume-ru.pdf'
        : '/resume/Anton-Resume-en.pdf';

    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (loading) return;

        setLoading(true);
        const toastId = toast.loading(dict.toast.loading);

        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error(dict.toast.downloadError);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName.split('/').pop()!;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            // Немного подождать перед success (чтобы не моргало)
            setTimeout(() => {
                toast.success(dict.toast.success, { id: toastId });
            }, 700);
        } catch (error) {
            setTimeout(() => {
                toast.error(dict.toast.error, { id: toastId });
            }, 500);
        } finally {
            setLoading(false);
        }
    };



    return (
        <Button
            onClick={handleDownload}
            variant="danger"
        >
            {dict.header.resume}
        </Button>
    );
}
