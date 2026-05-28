interface CertificationCardProps {
  title: string;
  year: string;
  description: string;
  certLink?: string;
  imageUrl: string;
}

const CertificationCard = ({
  title,
  year,
  description,
  certLink,
  imageUrl,
}: CertificationCardProps) => {
  return (
    <article
      className="
        flex flex-col gap-4
        rounded-xl
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5 sm:p-6
        shadow-[0_4px_6px_var(--color-shadow)]
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-[0_8px_15px_var(--color-shadow)]
      "
    >
      {/* Row 1 — Title centered (vertically aligned with the section heading); date pinned to the absolute left with higher z-index */}
      <div className="relative flex w-full items-center justify-center">
        <span
          className="
            absolute right-0 top-1/2 z-10 -translate-y-1/2
            whitespace-nowrap
            rounded-full
            bg-[var(--color-bg)] px-3 py-1
            text-sm font-medium text-[var(--color-text-secondary)]
            shadow-[0_1px_3px_var(--color-shadow)]
          "
        >
          {year}
        </span>
        <h3 className="text-center text-lg font-semibold leading-tight text-[var(--color-text)]">
          {title}
        </h3>
      </div>

      {/* Row 2 — Image at the extreme left; description sits in a narrower centered
          section flanked by image-width gaps on both sides. The right-side spacer mirrors
          the image's box, so any change to image size keeps the description symmetric. */}
      <div className="flex items-start gap-4 sm:gap-5">
        <div
          className="
            flex h-20 w-20 flex-shrink-0
            items-center justify-center
            overflow-hidden
            rounded-lg
            bg-[var(--color-bg)]
            sm:h-24 sm:w-24
            md:h-28 md:w-28
          "
        >
          <img
            src={imageUrl}
            alt={`${title} certification`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>

        <div
          aria-hidden
          className="h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28"
        />
      </div>

      {/* Row 3 — Button centered, aligned with the section heading and title */}
      {certLink && (
        <div className="flex justify-center">
          <a
            href={certLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-md
              border border-[var(--color-primary)]
              bg-[var(--color-primary)]
              px-5 py-2
              text-sm font-medium text-white
              transition-all duration-200
              hover:-translate-y-px hover:opacity-90
            "
          >
            View Certification
          </a>
        </div>
      )}
    </article>
  );
};

export default CertificationCard;
