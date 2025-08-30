/**
 * Type declarations for React, Next.js, and Framer Motion
 * 
 * This file provides TypeScript declarations for external modules
 * that may not have their own type definitions or need to be augmented.
 */

// React module declaration
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

// Next.js Link module declaration
declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';
  import * as React from 'react';
  
  type LinkProps = NextLinkProps & {
    children?: React.ReactNode;
    className?: string;
  };
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

// Next.js navigation module declaration
declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    back(): void;
  };
}

// Framer Motion module declaration
declare module 'framer-motion' {
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    className?: string;
    style?: React.CSSProperties;
    layoutId?: string;
    [key: string]: any;
  }
  
  export const motion: {
    div: React.FC<MotionProps>;
    span: React.FC<MotionProps>;
    path: React.FC<MotionProps>;
    svg: React.FC<MotionProps>;
    [key: string]: React.FC<MotionProps>;
  };
}

// Ensure JSX namespace is available
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
