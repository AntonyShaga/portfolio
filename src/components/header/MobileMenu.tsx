'use client';

import {useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import DownloadResumeButton from "@/components/resumeButton/DownloadResumeButton";
import MotionWrapper from "@/components/ui/MotionWrapper";
import {ToastMessages} from "@/types/dictionary";

export default function MobileMenu({
                                       open,
                                       onClose,
                                       children,
                                       toast,
                                   }: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    toast:ToastMessages
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

    return (
        <AnimatePresence>
            {open && (
                <MotionWrapper
                    ref={menuRef}
                    role="dialog"
                    aria-modal="true"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-16 left-0 right-0 bg-white dark:bg-black transition-all duration-200 dark:text-white text-black shadow-lg "
                >
                    <div className="container mx-auto px-4 py-4 z-49">
                        {children}
                        <div className="pt-4">
                            <DownloadResumeButton  toastErr={toast}/>
                        </div>
                    </div>
                </MotionWrapper>
            )}
        </AnimatePresence>
    );
}
