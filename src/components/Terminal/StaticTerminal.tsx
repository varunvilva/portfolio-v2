type LinkEntry = { href: string; label: string; external?: boolean };

type Output =
  | { kind: 'string'; value: string }
  | { kind: 'array'; values: string[] }
  | { kind: 'mixed'; parts: Array<{ type: 'text'; value: string } | { type: 'link'; link: LinkEntry }> };

interface Line {
  command: string;
  out: Output;
}

const lines: Line[] = [
  {
    command: 'Varun.currentLocation',
    out: { kind: 'string', value: 'Bengaluru, KA' },
  },
  {
    command: 'Varun.contactInfo',
    out: {
      kind: 'mixed',
      parts: [
        { type: 'text', value: '"' },
        { type: 'link', link: { href: 'mailto:varunvilva1208@gmail.com', label: 'varunvilva1208@gmail.com' } },
        { type: 'text', value: '", "' },
        { type: 'link', link: { href: 'https://linkedin.com/in/varunvilva', label: 'LinkedIn', external: true } },
        { type: 'text', value: '", "' },
        { type: 'link', link: { href: 'https://github.com/varunvilva', label: 'github', external: true } },
        { type: 'text', value: '"' },
      ],
    },
  },
  {
    command: 'Varun.resume',
    out: {
      kind: 'mixed',
      parts: [
        {
          type: 'link',
          link: { href: '/VarunVilvadrinath_Resume.pdf', label: '"varunvilva_resume.pdf"', external: true },
        },
      ],
    },
  },
  {
    command: 'Varun.interests',
    out: {
      kind: 'array',
      values: ['reading', 'working out', 'video games', 'watching movies/series'],
    },
  },
  {
    command: 'Varun.education',
    out: {
      kind: 'array',
      values: [
        'Computer Science & Engineering, IIIT Vadodara',
        'B.Sc. Data Science and Programming, IIT Madras',
      ],
    },
  },
  {
    command: 'Varun.domains',
    out: {
      kind: 'array',
      values: [
        'Software Development',
        'Data Engineering',
        'Data Science',
        'Machine Learning & Artificial Intelligence',
        'Devops (AWS)',
      ],
    },
  },
  {
    command: 'Varun.skills',
    out: {
      kind: 'array',
      values: ['Java - SpringBoot', 'NodeJs', 'Python', 'React', 'Redux', 'Flask', 'git', 'go', 'kafka', 'AWS', 'Docker'],
    },
  },
];

const stringClass = 'text-[var(--color-terminal-string)]';
const bracketClass = 'text-[var(--color-terminal-string)]';
const linkClass =
  'text-[var(--color-terminal-link)] no-underline hover:underline transition-colors';

const renderOutput = (out: Output) => {
  if (out.kind === 'string') {
    return <span className={stringClass}>"{out.value}"</span>;
  }

  if (out.kind === 'array') {
    return (
      <>
        <span className={bracketClass}>[</span>
        {out.values.map((v, i) => (
          <span key={v}>
            <span className={stringClass}>"{v}"</span>
            {i < out.values.length - 1 && <span className={bracketClass}>, </span>}
          </span>
        ))}
        <span className={bracketClass}>]</span>
      </>
    );
  }

  return (
    <>
      <span className={bracketClass}>[</span>
      {out.parts.map((p, i) => {
        if (p.type === 'text') {
          return (
            <span key={i} className={bracketClass}>
              {p.value}
            </span>
          );
        }
        return (
          <a
            key={i}
            href={p.link.href}
            target={p.link.external ? '_blank' : undefined}
            rel={p.link.external ? 'noopener noreferrer' : undefined}
            className={linkClass}
          >
            {p.link.label}
          </a>
        );
      })}
      <span className={bracketClass}>]</span>
    </>
  );
};

const StaticTerminal = () => {
  return (
    <div className="overflow-hidden rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex items-center bg-[var(--color-terminal-header)] px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28ca42]" />
        </div>
      </div>

      <div className="bg-[var(--color-terminal-bg)] p-5 text-sm leading-snug text-[var(--color-terminal-text)] sm:p-6 sm:text-base">
        {lines.map(({ command, out }) => (
          <div key={command} className="mb-3 last:mb-0">
            <div className="flex items-start gap-2">
              <span className="text-white">{'>'}</span>
              <span className="break-all text-white">{command}</span>
            </div>
            <div className="ml-4 mt-0.5 break-words">{renderOutput(out)}</div>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-white">{'>'}</span>
          <span className="inline-block animate-[terminal-blink_1s_steps(2,end)_infinite] text-white">█</span>
        </div>
      </div>
    </div>
  );
};

export default StaticTerminal;
