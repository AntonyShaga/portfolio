'use client'

import { useState } from 'react';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';

export default function BurgerButtonWrapper({ navContent }: { navContent: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <>
            <BurgerButton open={open} onClickAction={toggleMenu} />
            <MobileMenu open={open} onClose={toggleMenu}>
                {navContent}
            </MobileMenu>
        </>
    );
}
