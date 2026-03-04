import type { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export function svgToLucide(
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  name: string = Component.displayName ?? 'CustomIcon',
): LucideIcon {
  const Wrapped = forwardRef<SVGSVGElement, LucideProps>(
    (
      { size = 24, strokeWidth = 2, absoluteStrokeWidth, className, ...rest },
      ref,
    ) => {
      const computedStrokeWidth = absoluteStrokeWidth
        ? (Number(strokeWidth) * 24) / Number(size)
        : strokeWidth;

      return (
        <Component
          ref={ref}
          width={size}
          height={size}
          strokeWidth={computedStrokeWidth}
          className={className}
          {...rest}
        />
      );
    },
  );

  Wrapped.displayName = name;

  return Wrapped as LucideIcon;
}
