'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Button from "@/components/ui/Button";

type DownloadResumeButtonProps = {
    children: React.ReactNode;
};

export default function DownloadResumeButton({ children }: DownloadResumeButtonProps) {
    const pathname = usePathname();

    const locale = useMemo(() => {
        const parts = pathname.split('/');
        return parts[1] || 'en'; // fallback
    }, [pathname]);

    const fileName = locale === 'ru'
        ? '/resume/Anton-Resume-ru.pdf'
        : '/resume/Anton-Resume-en.pdf';

    return (
        <Button
            href={fileName}
            download
            variant="danger"
            //leftIcon={<FileDown />}
        >
            {children}
        </Button>
    );
}
