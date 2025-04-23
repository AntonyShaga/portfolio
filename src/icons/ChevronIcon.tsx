import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const ChevronIcon = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.75 9.75l6.19 6.19a1.5 1.5 0 0 0 2.12 0l6.19-6.19"></path>
    </IconBase>
));

ChevronIcon.displayName = 'ChevronIcon';

export default ChevronIcon;
