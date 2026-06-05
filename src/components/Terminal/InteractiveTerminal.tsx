import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { pathString, type Path } from './filesystem';
import { getCompletions, runCommand, type CompletionMatch } from './commands';
import content from '../../data/content';

const { prompt: promptConfig, interactive } = content.terminal;
const promptHost = `${promptConfig.user}@${promptConfig.host}`;

/* ── Prompt component ───────────────────────────────────────────────────── */

const Prompt = ({ path }: { path: Path }) => (
  <span className="whitespace-nowrap">
    <span className="text-[#50fa7b]">{promptHost}</span>
    <span className="text-white">:</span>
    <span className="text-[#7dcfff]">{pathString(path)}</span>
    <span className="text-white">{' $ '}</span>
  </span>
);

/* ── Banner ─────────────────────────────────────────────────────────────── */

const Banner = () => (
  <pre className="mb-4 whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)] opacity-90">
    {`${interactive.bannerTitle}\n\n`}
    {interactive.bannerHints.map((part, i) =>
      part.type === 'cmd' ? (
        <span key={i} className="text-[var(--color-terminal-string)]">
          {part.value}
        </span>
      ) : (
        <span key={i}>{part.value}</span>
      ),
    )}
  </pre>
);

/* ── Tab-completion list ────────────────────────────────────────────────── */

const CompletionList = ({ matches }: { matches: ReadonlyArray<CompletionMatch> }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-1">
    {matches.map((m) => (
      <span
        key={m.name}
        className={m.trail === '/' ? 'font-semibold text-[#a5b4fc]' : 'text-[var(--color-terminal-text)]'}
      >
        {m.name}
        {m.trail === '/' ? '/' : ''}
      </span>
    ))}
  </div>
);

/* ── History entry types ────────────────────────────────────────────────── */

type HistoryEntry =
  | { kind: 'banner' }
  | { kind: 'log'; cwd: Path; command: string; output: ReactNode };

/* ── Component ──────────────────────────────────────────────────────────── */

const InteractiveTerminal = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([{ kind: 'banner' }]);
  const [cwd, setCwd] = useState<Path>([]);
  const [input, setInput] = useState('');

  // Up/down arrow recall — separate from rendered scrollback.
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever new output lands.
  useLayoutEffect(() => {
    const node = bodyRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [history]);

  // Focus input on mount.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const raw = input;
      setInput('');

      if (raw.trim()) {
        setCommandHistory((prev) => (prev[prev.length - 1] === raw ? prev : [...prev, raw]));
      }
      setHistoryIndex(-1);

      const result = runCommand(raw, { cwd });

      if (result.clear) {
        setHistory(result.output ? [{ kind: 'log', cwd, command: raw, output: result.output }] : []);
      } else {
        setHistory((prev) => [...prev, { kind: 'log', cwd, command: raw, output: result.output }]);
      }

      if (result.newCwd) setCwd(result.newCwd);
      result.effect?.();
    },
    [input, cwd],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // Ctrl/Cmd + L → clear screen.
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setHistory([]);
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const { matches, applyMatch } = getCompletions(input, cwd);

        if (matches.length === 0) return;

        if (matches.length === 1) {
          setInput(applyMatch(matches[0]));
          return;
        }

        // Multiple matches → echo current prompt + partial, list options.
        // Do NOT modify the input (per Linux convention without common-prefix completion).
        setHistory((prev) => [
          ...prev,
          {
            kind: 'log',
            cwd,
            command: input,
            output: <CompletionList matches={matches} />,
          },
        ]);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const nextIndex = historyIndex < 0 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] ?? '');
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < 0) return;
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    },
    [commandHistory, historyIndex, input, cwd],
  );

  const onBodyClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Don't hijack focus when selecting text or clicking a link.
    if (window.getSelection()?.toString()) return;
    if ((e.target as HTMLElement).closest('a')) return;
    inputRef.current?.focus();
  }, []);

  return (
    <div className="overflow-hidden rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between bg-[var(--color-terminal-header)] px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28ca42]" />
        </div>
        <span className="text-xs text-gray-700">
          varun@portfolio — {pathString(cwd)}
        </span>
        <span className="w-12" aria-hidden />
      </div>

      {/* Scrolling body */}
      <div
        ref={bodyRef}
        onClick={onBodyClick}
        className="
          terminal-scrollbar
          h-[480px] overflow-y-auto
          bg-[var(--color-terminal-bg)]
          p-5
          text-sm leading-relaxed
          text-[var(--color-terminal-text)]
          sm:text-base
          cursor-text
        "
        role="region"
        aria-label="Interactive terminal"
      >
        {history.map((entry, i) =>
          entry.kind === 'banner' ? (
            <Banner key={`b-${i}`} />
          ) : (
            <div key={`l-${i}`} className="mb-2">
              <div className="break-words">
                <Prompt path={entry.cwd} />
                <span>{entry.command}</span>
              </div>
              {entry.output != null && <div className="mt-0.5 break-words">{entry.output}</div>}
            </div>
          ),
        )}

        {/* Live input line */}
        <form onSubmit={handleSubmit} className="flex flex-wrap items-baseline gap-2">
          <Prompt path={cwd} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              flex-1 min-w-0
              border-none bg-transparent
              text-white caret-white
              outline-none
              [caret-shape:block]
            "
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
