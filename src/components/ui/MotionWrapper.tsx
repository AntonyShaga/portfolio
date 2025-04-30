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



const MotionWrapper = ({
                           children,
                           as = 'div',
                           className = '',
                           ...rest
                       }: MotionWrapperProps) => {
    const Component = motion[as as keyof typeof motion] as ElementType;

    return (
        <Component
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default MotionWrapper;
