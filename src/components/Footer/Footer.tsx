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
      Made By Varun Vilvadrinath © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
