'use client';

import { useEffect, useRef } from 'react';
import DownloadResumeButton from "@/components/DownloadResumeButton";

export default function MobileMenu({
                                       open,
                                       onClose,
                                       children,
                                   }: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, [data-close-menu]')) {
                onClose();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const menu = menuRef.current;

        if (open) {
            setTimeout(() => menu?.addEventListener('click', handleClick), 100);
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            menu?.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            className="fixed top-16 left-0 right-0 transition-all duration-300 bg-white dark:bg-black dark:text-white text-black shadow-lg"
        >
            <div className="container mx-auto px-4 py-4">
                {children}
                <div className="pt-4">
                    <DownloadResumeButton />
                </div>
            </div>
        </div>
    );
}
