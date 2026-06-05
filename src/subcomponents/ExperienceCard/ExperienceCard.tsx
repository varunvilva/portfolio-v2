interface ExperienceCardProps {
  companyName: string;
  year: string;
  experience: string;
  imageUrl: string;
  imageAlt: string;
  location: string;
  position?: string;
  duration?: string;
  technologies?: readonly string[];
  companyUrl?: string;
}

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ExperienceCard = ({
  companyName,
  year,
  experience,
  imageUrl,
  imageAlt,
  location,
  position,
  duration,
  technologies,
  companyUrl,
}: ExperienceCardProps) => {
  return (
    <article
      className="
        flex flex-col md:flex-row
        overflow-hidden
        rounded-xl
        bg-[var(--color-surface)]
        shadow-[0_4px_15px_var(--color-shadow)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_8px_25px_var(--color-shadow)]
      "
    >
      <div className="relative h-44 w-full flex-shrink-0 sm:h-52 md:h-auto md:w-1/2">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-contain object-center p-4"
          loading="lazy"
        />
        <div
          className="
            absolute inset-x-0 bottom-0
            bg-gradient-to-t from-black/70 to-transparent
            p-4 text-white
          "
        >
          <h4 className="flex items-center justify-center gap-2 text-base font-semibold sm:text-lg">
            <PinIcon />
            {location}
          </h4>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 text-center sm:p-6 md:p-8">
        <h3 className="mb-2 text-xl font-semibold leading-tight text-[var(--color-text)] sm:text-2xl">
          {companyName}
        </h3>

        {position && (
          <p className="mb-2 text-base font-medium text-[var(--color-primary)] sm:text-lg">
            {position}
          </p>
        )}

        {duration && (
          <p className="mb-4 flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
            <CalendarIcon />
            {duration}
          </p>
        )}

        <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {experience}
        </p>

        <div
          className="
            mb-6 border-y border-[var(--color-border)]
            py-2 text-center
            text-base font-semibold text-[var(--color-primary)]
          "
        >
          {year}
        </div>

        {technologies && technologies.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border border-[var(--color-tag-border)]
                  bg-[var(--color-tag-bg)]
                  px-3 py-1
                  text-xs font-medium text-[var(--color-tag-text)]
                  sm:text-sm
                "
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {companyUrl && (
          <div className="flex justify-center">
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-1.5
                rounded-md
                bg-[var(--color-primary)] px-5 py-2.5
                text-sm font-medium text-white
                transition-opacity duration-200
                hover:opacity-90
              "
            >
              Visit Company ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ExperienceCard;
