import * as React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
}

export default function Image({
  fill,
  priority,
  className,
  style,
  alt = '',
  loading,
  ...props
}: ImageProps) {
  return (
    <img
      alt={alt}
      loading={priority ? 'eager' : (loading || 'lazy')}
      className={`${fill ? 'absolute inset-0 w-full h-full object-cover' : ''} ${className || ''}`}
      style={style}
      {...props}
    />
  );
}
