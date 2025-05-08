import * as React from 'react';

export type IconBaseProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
  children?: React.ReactNode;
};

const IconBase = React.forwardRef<SVGSVGElement, IconBaseProps>(
  ({ children, title, className, ...rest }, ref) => (
    <svg
      ref={ref}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  ),
);

IconBase.displayName = 'IconBase';

export default IconBase;
