import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const SectionTitle = ({ children, id, className = '' }: SectionTitleProps) => {
  return (
    <h2
      id={id}
      className={`
        mb-8 text-center
        text-[clamp(1.8rem,5vw,2.5rem)] font-semibold
        text-[var(--color-text)]
        sm:mb-10
        md:mb-12
        ${className}
      `.trim()}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
