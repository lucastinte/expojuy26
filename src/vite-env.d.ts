/// <reference types="vite/client" />

declare module 'next/image' {
  import React from 'react';
  interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean;
    priority?: boolean;
    src: string;
    alt: string;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}
