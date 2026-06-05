import Typewriter from 'typewriter-effect';
import Container from '../Container/Container';
import content from '../../data/content';

const { hero } = content;

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container as="header" className="my-16 sm:my-20">
      <h1
        className="
          flex items-baseline
          text-[2.25rem] leading-tight tracking-[0.02em]
          text-[var(--color-primary)]
          sm:text-[3rem]
          md:text-[3.5rem]
          lg:text-[4.5rem]
        "
      >
        <span className="mr-2 font-bold font-sans" aria-hidden="true">
          {'>'}
        </span>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(hero.name).start();
          }}
          options={{
            cursor: '█',
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </h1>

      <p
        className="
          mt-8 max-w-3xl
          text-[1.05rem] leading-[1.9] font-light
          text-[var(--color-text-secondary)]
          sm:text-[1.15rem] sm:leading-[2.1]
          md:text-[1.2rem] md:leading-[2.2]
        "
        style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {hero.introPrefix}
        <a
          href={hero.currentCompany.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] transition-opacity duration-300 hover:opacity-80"
        >
          {hero.currentCompany.name}
        </a>
        {hero.tagline}
        <br />
        {hero.ctaPrompt}
        <button
          type="button"
          onClick={() => scrollTo(hero.ctaTargetId)}
          className="
            cursor-pointer
            bg-transparent
            text-[var(--color-primary)]
            transition-colors duration-300
            hover:text-[var(--color-primary-hover)] hover:opacity-80
          "
        >
          {hero.ctaLabel}
        </button>
      </p>
    </Container>
  );
};

export default Hero;
