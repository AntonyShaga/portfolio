import React from 'react';

import Link from 'next/link';
import Linkedin from "@/icons/Linkedin";
import Git from "@/icons/Git";
import Facebook from "@/icons/Facebook";
import MotionWrapper from "@/components/ui/MotionWrapper";

interface SocialLink {
    href: string;
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    delay: number;
}

const socials:SocialLink[] = [
    {
        href: 'https://github.com',
        Icon: Git,
        label: 'GitHub',
        delay: 0.4,
    },
    {
        href: 'https://facebook.com',
        Icon: Facebook,
        label: 'Facebook',
        delay: 0.5,
    },
    {
        href: 'https://linkedin.com',
        Icon: Linkedin,
        label: 'Linkedin',
        delay: 0.6,
    },
];

const SocialLinks = () => (
    <MotionWrapper
        className="flex items-center gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ delay: 0.3 }}
    >
        {socials.map(({ href, Icon, label, delay }) => (
            <MotionWrapper
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay }}>
                <Link
                    aria-label={label}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex и items-center transition-colors"
                >
                    <Icon className="text-gray-500 hover:text-neutral-800 w-6 h-6 dark:hover:text-white transition-colors" />
                    <span className="sr-only">{label}</span>
                </Link>
            </MotionWrapper>
        ))}
    </MotionWrapper>
);

export default SocialLinks;
