'use client';

import { useState } from 'react';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';
import { ToastMessages } from '@/types/dictionary';

export default function BurgerButtonWrapper({
  navContent,
  toast,
}: {
  navContent: React.ReactNode;
  toast: ToastMessages;
}) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <BurgerButton open={open} onClickAction={toggleMenu} />
      <MobileMenu open={open} onClose={toggleMenu} toast={toast}>
        {navContent}
      </MobileMenu>
    </>
  );
}
