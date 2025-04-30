'use client'

import { useEffect } from 'react';
import DownloadResumeButton from "@/components/DownloadResumeButton";

export default function MobileMenu({
                                       open,
                                       onClose,
                                       children
                                   }: {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 lg:hidden">
            {/* Затемнение фона */}
            <div
                className="fixed inset-0 "
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Само меню - теперь под хедером */}
            <div
                className="fixed top-16 left-0 right-0 bg-white dark:bg-black dark:text-white text-black shadow-lg"
                style={{ height: 'calc(100vh - 4rem)' }}
            >
                <div className="container mx-auto px-4 py-4">
                    {children}
                    <div className="pt-4">
                        <DownloadResumeButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
