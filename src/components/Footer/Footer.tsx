import content from '../../data/content';

const Footer = () => {
  return (
    <footer
      className="
        mt-auto
        border-t border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-4 py-8
        text-center text-sm text-[var(--color-text-secondary)]
      "
    >
      Made By {content.footer.author} © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
