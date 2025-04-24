import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const ExternalLink = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
    <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </IconBase>
));

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
