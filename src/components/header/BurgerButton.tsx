'use client';

import { AnimatePresence } from 'framer-motion';
import Cross from '@/icons/Cross';
import Burger from '@/icons/Burger';
import Button from '@/components/ui/Button';
import MotionWrapper from '@/components/ui/MotionWrapper';

interface BurgerButtonProps {
  open: boolean;
  onClickAction: () => void;
}

export default function BurgerButton({ open, onClickAction }: BurgerButtonProps) {
  return (
    <Button onClick={onClickAction} aria-label="Toggle menu">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <MotionWrapper
            key="cross"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Cross className="w-6 h-6" />
          </MotionWrapper>
        ) : (
          <MotionWrapper
            key="burger"
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -180 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Burger className="w-6 h-6" />
          </MotionWrapper>
        )}
      </AnimatePresence>
    </Button>
  );
}
