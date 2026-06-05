interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: readonly string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  technologies,
  liveUrl,
  sourceUrl,
}: ProjectCardProps) => {
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
      <div className="relative h-48 w-full flex-shrink-0 sm:h-56 md:h-auto md:w-1/2">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-[var(--color-surface)] p-5 text-center sm:p-6 md:p-8">
        <h3 className="mb-4 text-xl font-semibold leading-tight text-[var(--color-text)] sm:text-2xl">
          {title}
        </h3>

        <p className="mb-6 flex-grow text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {description}
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="
                whitespace-nowrap
                rounded-full
                border border-[var(--color-tag-border)]
                bg-[var(--color-tag-bg)]
                px-3 py-1.5
                text-xs font-medium text-[var(--color-tag-text)]
                sm:text-sm
              "
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          {liveUrl && (
            <a
              href={liveUrl}
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
              Live Demo ↗
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-1.5
                rounded-md
                border border-[var(--color-border)]
                bg-[var(--color-bg)] px-5 py-2.5
                text-sm font-medium text-[var(--color-text-secondary)]
                transition-colors duration-200
                hover:bg-[var(--color-border)] hover:text-[var(--color-text)]
              "
            >
              ⌘ View Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
