'use client';

import { motion, MotionProps, Variants, Transition } from 'framer-motion';
import {
    ElementType,
    ReactNode,
    forwardRef,
    ComponentPropsWithoutRef,
    ForwardedRef
} from 'react';

type MotionWrapperProps<T extends keyof HTMLElementTagNameMap> = {
    as?: T;
    children: ReactNode;
    className?: string;
    suppressHydrationWarning?: boolean;
    variants?: Variants;
    transition?: Transition;
} & MotionProps & ComponentPropsWithoutRef<T>;

const MotionWrapper = <T extends keyof HTMLElementTagNameMap = 'div'>(
    {
        as = 'div' as T,
        children,
        className = '',
        suppressHydrationWarning,
        ...rest
    }: MotionWrapperProps<T>,
    ref: ForwardedRef<HTMLElementTagNameMap[T]>
) => {
    const Component = motion[as] as ElementType;

    return (
        <Component
            ref={ref}
            className={className}
            suppressHydrationWarning={suppressHydrationWarning}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default forwardRef(MotionWrapper);
