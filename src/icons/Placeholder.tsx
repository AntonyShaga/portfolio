import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const Placeholder = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
            {props.title}
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M10 20.415A8 8 0 1 0 13 5h-3"></path><path d="m13 8l-3-3l3-3M7 17l4-4l-4-4l-4 4z"></path></g>    </IconBase>
));

Placeholder.displayName = 'Placeholder';

export default Placeholder;
