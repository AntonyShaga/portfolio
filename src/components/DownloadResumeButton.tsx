'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Button from "@/components/ui/Button";
import { useDictionary } from "@/app/i18n/DictionaryContext";

export default function DownloadResumeButton() {
    const pathname = usePathname();
    const dict = useDictionary();

    const locale = useMemo(() => {
        const parts = pathname.split('/');
        return parts[1] || 'en';
    }, [pathname]);

    const fileNames: Record<string, string> = {
        en: '/resume/Anton-Resume-en.pdf',
        ru: '/resume/Anton-Resume-ru.pdf',
    };

    const fileName = fileNames[locale] || fileNames.en;

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

            await new Promise(resolve => setTimeout(resolve, 700));
            toast.success(dict.toast.success, { id: toastId });
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const errorMessage = error instanceof Error ? error.message : dict.toast.downloadError;
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            variant="danger"
            disabled={loading}
        >
            {dict.header.resume}
        </Button>
    );
}
