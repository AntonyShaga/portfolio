'use client'

import { motion, MotionProps, Variants, Transition } from 'framer-motion';
import {ElementType, JSX, ReactNode} from 'react';

interface MotionWrapperProps extends MotionProps {
    children: ReactNode;
    as?: keyof JSX.IntrinsicElements;
    variants?: Variants;
    transition?: Transition;
    className?: string;
}

const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const defaultTransition: Transition = {
    duration: 0.5,
};

const MotionWrapper = ({
                           children,
                           variants = fadeInUp,
                           initial = 'initial',
                           animate = 'animate',
                           transition = defaultTransition,
                           as = 'div',
                           className = '',
                           ...rest
                       }: MotionWrapperProps) => {
    const Component = motion[as as keyof typeof motion] as ElementType;

    return (
        <Component
            variants={variants}
            initial={initial}
            animate={animate}
            transition={transition}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default MotionWrapper;
