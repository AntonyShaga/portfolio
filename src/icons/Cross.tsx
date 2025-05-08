import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const Cross = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
  <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M20 20L4 4m16 0L4 20"
    ></path>
  </IconBase>
));

Cross.displayName = 'Cross';

export default Cross;
