import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const SunIcon = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
  <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="3.5" />
      <path
        strokeLinecap="round"
        d="M12 5V3m0 18v-2m4.95-11.95l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2m11.95 4.95l1.414 1.414M5.636 5.636L7.05 7.05"
      />
    </g>
  </IconBase>
));

SunIcon.displayName = 'SunIcon';

export default SunIcon;
