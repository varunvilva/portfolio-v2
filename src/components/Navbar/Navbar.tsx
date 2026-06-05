import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Container from '../Container/Container';
import content from '../../data/content';

const navItems = content.sections;

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleScroll = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="
          fixed bottom-4 right-4 z-[9999]
          flex h-11 w-11 items-center justify-center
          rounded-full
          border-2 border-[var(--color-border)]
          bg-[var(--color-surface)] text-[var(--color-text)]
          shadow-[0_4px_12px_var(--color-shadow)]
          transition-all duration-300
          hover:scale-110 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_6px_16px_var(--color-shadow)]
          sm:bottom-5 sm:right-5 sm:h-12 sm:w-12
        "
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <div
        className="
          sticky top-0 z-50
          border-b border-transparent
          bg-[var(--color-navbar)]
          px-0 py-2.5
          backdrop-blur-md
          transition-colors duration-300
        "
      >
        <Container as="nav" className="relative flex items-center justify-end md:justify-center">
          <div className="hidden gap-5 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScroll(item.id)}
                className="
                  group relative cursor-pointer
                  rounded
                  bg-transparent
                  px-3 py-2
                  text-base text-[var(--color-text)]
                  transition-colors duration-300
                  hover:text-[var(--color-primary)]
                "
              >
                {item.label}
                <span
                  aria-hidden
                  className="
                    absolute bottom-0 left-0 h-0.5 w-0
                    bg-[var(--color-primary)]
                    transition-[width] duration-300 ease-out
                    group-hover:w-full
                  "
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="
              relative flex h-8 w-8 items-center justify-center
              bg-transparent text-[var(--color-text)]
              md:hidden
            "
          >
            <span
              className={`absolute left-0 h-[3px] w-full rounded-sm bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-sm bg-current transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-[3px] w-full rounded-sm bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'
              }`}
            />
          </button>

          <div
            className={`
              absolute right-4 top-full
              mt-2 min-w-[200px]
              rounded-lg border border-[var(--color-border)]
              bg-[var(--color-surface)]
              py-2
              shadow-[0_4px_12px_var(--color-shadow)]
              transition-all duration-300
              md:hidden
              ${isMobileMenuOpen
                ? 'visible translate-y-0 opacity-100'
                : 'invisible -translate-y-2 opacity-0'}
            `}
            role="menu"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScroll(item.id)}
                className="
                  block w-full
                  px-5 py-3
                  text-left text-base text-[var(--color-text)]
                  transition-colors duration-200
                  hover:bg-black/5 hover:text-[var(--color-primary)]
                  dark:hover:bg-white/5
                "
              >
                {item.label}
              </button>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
