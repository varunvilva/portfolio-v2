import { CARD_BASE_CLASS } from '../cardStyles';

interface PublicationCardProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  liveUrl?: string;
}

const PublicationCard = ({ title, imageUrl, imageAlt, liveUrl }: PublicationCardProps) => {
  return (
    <article className={`flex flex-col md:flex-row ${CARD_BASE_CLASS}`}>
      <div className="flex h-56 w-full items-center justify-center bg-[var(--color-surface)] md:h-auto md:w-2/5">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-contain object-center p-4"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center p-5 text-center sm:p-6 md:p-8">
        <h3 className="mb-6 text-xl font-semibold leading-tight text-[var(--color-text)] sm:text-2xl">
          {title}
        </h3>

        {liveUrl && (
          <div className="flex justify-center">
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
              Visit Site
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default PublicationCard;
