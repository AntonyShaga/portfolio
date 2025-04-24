import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const ChevronIcon = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v15.879M5.25 13.75l5.69 5.69c.292.292.676.439 1.06.439m6.75-6.129l-5.69 5.69a1.5 1.5 0 0 1-1.06.439"></path>
    </IconBase>
));

ChevronIcon.displayName = 'ChevronIcon';

export default ChevronIcon;
