import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 focus:ring-neutral-900 dark:focus:ring-white',
        secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:ring-neutral-500',
        ghost: 'bg-transparent text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    const MotionComponent = motion.create(href ? 'a' : 'button');

    return (
        <MotionComponent
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            href={href}
            onClick={onClick}
            type={href ? undefined : type}
            disabled={disabled}
            className={combinedStyles}
        >
            {children}
        </MotionComponent>
    );
}
