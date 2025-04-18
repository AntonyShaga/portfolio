import React from 'react';

export default function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="1024"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            {...props}
        >
            <path d="M240.448 240.448a384 384 0 1 0 559.424 525.696a448 448 0 0 1-542.016-542.08a391 391 0 0 0-17.408 16.384m181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696" />
        </svg>
    );
}
