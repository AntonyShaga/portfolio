'use client';

import React, {ButtonHTMLAttributes, isValidElement, ReactElement, ReactNode,} from 'react';
import {getButtonClasses} from '@/lib/buttonStyles';
import type {Size, Variant} from '@/types/button';
import {cn} from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    active?: boolean;
    asChild?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    isDark?: boolean;
}

export default function Button({
                                   children,
                                   className,
                                   variant = 'default',
                                   size = 'md',
                                   isLoading = false,
                                   disabled,
                                   leftIcon,
                                   rightIcon,
                                   active = false,
                                   asChild = false,
                                   href,
                                   target,
                                   rel,
                                   isDark = false,
                                   ...props
                               }: ButtonProps) {
    const buttonClasses = getButtonClasses({ variant, size, active, className ,isDark});

    if (asChild && href) {
        return (
            <Link
                href={href}
                className={cn(buttonClasses, className)}
                target={target}
                rel={rel}
                aria-disabled={disabled || isLoading}
                aria-busy={isLoading}
                {...props}
            >
                {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </Link>
        );
    }

    if (asChild) {
        if (!isValidElement(children)) {
            throw new Error('Children must be a valid React element when asChild is true');
        }

        const child = children as ReactElement<{ className?: string; disabled?: boolean; 'aria-disabled'?: boolean; 'aria-busy'?: boolean }>;

        return React.cloneElement(child, {
            ...props,
            className: cn(buttonClasses, child.props.className),
            disabled: disabled || isLoading,
            'aria-disabled': disabled || isLoading,
            'aria-busy': isLoading,
        });
    }

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            aria-disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-black dark:border-white rounded-full" />
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
}
