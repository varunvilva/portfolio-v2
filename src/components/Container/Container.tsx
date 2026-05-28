import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Single source of truth for content width and horizontal padding.
 * Used by Hero, every Section, and the Navbar inner row so they all
 * align to the same vertical edges.
 */
const Container = ({ children, as: Tag = 'div', className = '', id }: ContainerProps) => {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
};

export default Container;
