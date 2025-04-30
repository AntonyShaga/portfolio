'use client'

import { useState } from 'react';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';

export default function BurgerButtonWrapper({ navContent }: { navContent: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <BurgerButton open={open} onClick={() => setOpen(!open)} />
            <MobileMenu open={open} onClose={() => setOpen(false)}>
                {navContent}
            </MobileMenu>
        </>
    );
}
