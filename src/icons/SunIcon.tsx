import React from 'react';

        export default function SunIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
    {...props}
    >
    <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="3.5" />
        <path
                strokeLinecap="round"
                d="M12 5V3m0 18v-2m4.95-11.95l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2m11.95 4.95l1.414 1.414M5.636 5.636L7.05 7.05"
        />
    </g>
</svg>
        );
        }

