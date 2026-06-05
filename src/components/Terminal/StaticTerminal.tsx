import content from '../../data/content';
import type { StaticTerminalOutput } from '../../data/content';

const stringClass = 'text-[var(--color-terminal-string)]';
const linkClass =
  'text-[var(--color-terminal-link)] no-underline hover:underline transition-colors';

const renderOutput = (out: StaticTerminalOutput) => {
  if (out.kind === 'string') {
    return <span className={stringClass}>"{out.value}"</span>;
  }

  if (out.kind === 'array') {
    return (
      <>
        <span className={stringClass}>[</span>
        {out.values.map((v, i) => (
          <span key={v}>
            <span className={stringClass}>"{v}"</span>
            {i < out.values.length - 1 && <span className={stringClass}>, </span>}
          </span>
        ))}
        <span className={stringClass}>]</span>
      </>
    );
  }

  return (
    <>
      <span className={stringClass}>[</span>
      {out.parts.map((p, i) => {
        if (p.type === 'text') {
          return (
            <span key={i} className={stringClass}>
              {p.value}
            </span>
          );
        }
        return (
          <a
            key={i}
            href={p.href}
            target={p.external ? '_blank' : undefined}
            rel={p.external ? 'noopener noreferrer' : undefined}
            className={linkClass}
          >
            {p.label}
          </a>
        );
      })}
      <span className={stringClass}>]</span>
    </>
  );
};

const StaticTerminal = () => {
  const lines = content.terminal.static.lines;

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
