import React from 'react';
import IconBase, { IconBaseProps } from './IconBase';

const Burger = React.forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => (
  <IconBase ref={ref} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
    ></path>
  </IconBase>
));

Burger.displayName = 'Burger';

export default Burger;
