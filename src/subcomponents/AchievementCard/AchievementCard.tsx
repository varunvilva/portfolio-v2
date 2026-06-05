interface AchievementCardProps {
  title: string;
  year: string;
  topic: string;
  achievement: string;
}

const AchievementCard = ({ title, year, topic, achievement }: AchievementCardProps) => {
  return (
    <article
      className="
        flex flex-col gap-4
        overflow-hidden
        rounded-xl
        bg-[var(--color-surface)]
        p-5 sm:p-6
        shadow-[0_4px_15px_var(--color-shadow)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_8px_25px_var(--color-shadow)]
        md:row-span-4 md:grid md:grid-rows-subgrid md:gap-4
      "
    >
      {/* Row 1 — Title (defined min height, centered) */}
      <h3
        className="
          flex min-h-[4rem] items-center justify-center
          text-center text-base font-semibold leading-snug text-[var(--color-text)]
          sm:text-lg
        "
      >
        {title}
      </h3>

      {/* Row 2 — Date (centered) */}
      <div className="flex items-start justify-center">
        <span
          className="
            whitespace-nowrap
            rounded-full
            bg-[var(--color-primary)] px-3 py-1
            text-xs font-medium text-white sm:text-sm
          "
        >
          {year}
        </span>
      </div>

      {/* Row 3 — Topic (centered, with left border accent) */}
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] rounded-sm bg-[var(--color-primary)]"
        />
        <h4 className="text-center text-sm font-medium leading-snug text-[var(--color-primary)] sm:text-base">
          {topic}
        </h4>
      </div>

      {/* Row 4 — Description (centered) */}
      <p className="text-center text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {achievement}
      </p>
    </article>
  );
};

export default AchievementCard;
