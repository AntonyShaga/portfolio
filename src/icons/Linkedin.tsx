import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const Linkedin = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path><circle cx={4} cy={4} r={2}></circle></g>
    </IconBase>
));

Linkedin.displayName = 'Linkedin';

export default Linkedin;
