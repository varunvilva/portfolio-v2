import { useEffect, useState } from 'react';
import Container from '../Container/Container';
import InteractiveTerminal from './InteractiveTerminal';
import StaticTerminal from './StaticTerminal';

/**
 * Track whether the viewport is at the `md` breakpoint or wider (≥768px).
 * Interactive shell makes sense on devices with a real keyboard; on small
 * touch screens we render a static read-only summary instead.
 */
const DESKTOP_QUERY = '(min-width: 768px)';

const useIsDesktop = () => {
  const getInitial = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(DESKTOP_QUERY).matches;
  };
  const [isDesktop, setIsDesktop] = useState<boolean>(getInitial);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
};

const Terminal = () => {
  const isDesktop = useIsDesktop();

  return (
    <Container className="mt-8 mb-20">
      {isDesktop ? <InteractiveTerminal /> : <StaticTerminal />}
    </Container>
  );
};

export default Terminal;
