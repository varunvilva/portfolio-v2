import type { ReactNode } from 'react';
import {
  filesystem,
  findTarget,
  getNode,
  pathString,
  resolvePath,
  type FsDir,
  type FsNode,
  type Path,
} from './filesystem';
import content from '../../data/content';

/* ── Public types ───────────────────────────────────────────────────────── */

export interface CommandContext {
  cwd: Path;
}

export interface CommandResult {
  /** Rendered below the input line. `null` = no output. */
  output: ReactNode;
  /** If set, the shell switches to this directory. */
  newCwd?: Path;
  /** If true, clears all scrollback before rendering output. */
  clear?: boolean;
  /** Optional side effect to run after the result is applied (e.g. window.open). */
  effect?: () => void;
}

type Command = (args: string[], ctx: CommandContext) => CommandResult;

/* ── Render helpers ─────────────────────────────────────────────────────── */

const sortNames = (a: string, b: string) => a.localeCompare(b);

const renderError = (msg: string): ReactNode => (
  <span className="text-[#ff8a8a]">{msg}</span>
);

/* ── Commands ───────────────────────────────────────────────────────────── */

const help: Command = () => ({
  output: (
    <pre className="whitespace-pre-wrap font-[inherit] leading-relaxed">
      {`Available commands:

  help                  Show this help
  ls [path]             List directory contents
  cd <path>             Change directory
  cat <file>            Display file contents
  open <file>           Open a binary/external file (PDF, link)
  pwd                   Print working directory
  whoami                A bit about me
  clear                 Clear the screen (Ctrl/Cmd+L)

Tips:
  · Each folder contains an info.txt with its content.
    Try `}<span className="text-[var(--color-terminal-string)]">cat about/info.txt</span>{`.
  · Paths resolve from any location, so `}
      <span className="text-[var(--color-terminal-string)]">cat experience/info.txt</span>
      {` works no matter where you are.
  · `}<span className="text-[var(--color-terminal-string)]">Tab</span>{` completes commands and paths.
  · `}<span className="text-[var(--color-terminal-string)]">↑ / ↓</span>{` cycles command history.`}
    </pre>
  ),
});

const ls: Command = (args, ctx) => {
  const target = args[0] ?? '';
  const resolved = findTarget(ctx.cwd, target);

  if (!resolved) {
    return {
      output: renderError(`ls: cannot access '${target || pathString(ctx.cwd)}': No such file or directory`),
    };
  }

  const { node } = resolved;

  // ls of a file just echoes the basename — same as POSIX ls.
  if (node.type !== 'dir') {
    const name = target.split('/').filter(Boolean).pop() ?? target;
    const className =
      node.type === 'link'
        ? 'text-[var(--color-terminal-link)]'
        : 'text-[var(--color-terminal-text)]';
    return { output: <span className={className}>{name}</span> };
  }

  const entries = Object.entries(node.children).sort(([a], [b]) => sortNames(a, b));
  if (entries.length === 0) {
    return {
      output: <span className="text-[var(--color-terminal-text)] opacity-60">(empty directory)</span>,
    };
  }

  return {
    output: (
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {entries.map(([name, child]) => (
          <span
            key={name}
            className={
              child.type === 'dir'
                ? 'font-semibold text-[#a5b4fc]'
                : child.type === 'link'
                  ? 'text-[var(--color-terminal-link)]'
                  : 'text-[var(--color-terminal-text)]'
            }
          >
            {name}
            {child.type === 'dir' ? '/' : ''}
          </span>
        ))}
      </div>
    ),
  };
};

const cd: Command = (args, ctx) => {
  if (args.length === 0) {
    return { output: null, newCwd: [] };
  }
  const target = args[0];
  const resolved = findTarget(ctx.cwd, target);

  if (!resolved) {
    return { output: renderError(`cd: no such file or directory: ${target}`) };
  }
  if (resolved.node.type !== 'dir') {
    return { output: renderError(`cd: not a directory: ${target}`) };
  }
  return { output: null, newCwd: resolved.path };
};

const cat: Command = (args, ctx) => {
  if (args.length === 0) {
    return { output: renderError('cat: missing operand. Try `cat <file>`') };
  }
  const target = args[0];
  const resolved = findTarget(ctx.cwd, target);

  if (!resolved) {
    return { output: renderError(`cat: ${target}: No such file or directory`) };
  }

  const { node } = resolved;

  if (node.type === 'dir') {
    return { output: renderError(`cat: ${target}: Is a directory`) };
  }

  if (node.type === 'link') {
    return {
      output: renderError(`cat: ${target}: Cannot display binary file. Try \`open ${target}\``),
    };
  }

  // file
  return {
    output: (
      <div className="whitespace-pre-wrap break-words text-[var(--color-terminal-text)]">
        {node.content}
      </div>
    ),
  };
};

const open: Command = (args, ctx) => {
  if (args.length === 0) {
    return { output: renderError('open: missing operand. Try `open <file>`') };
  }
  const target = args[0];
  const resolved = findTarget(ctx.cwd, target);

  if (!resolved) {
    return { output: renderError(`open: ${target}: No such file or directory`) };
  }

  const { node } = resolved;

  if (node.type === 'dir') {
    return { output: renderError(`open: ${target}: Is a directory`) };
  }

  if (node.type === 'file') {
    return { output: renderError(`open: ${target}: Not an external file. Try \`cat ${target}\``) };
  }

  const url = node.opensUrl;
  return {
    output: (
      <span className="text-[var(--color-terminal-text)]">
        {node.description}. Opening{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-terminal-link)] hover:underline"
        >
          {url}
        </a>
        …
      </span>
    ),
    effect: () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    },
  };
};

const pwd: Command = (_, ctx) => ({
  output: <span className="text-[var(--color-terminal-text)]">{pathString(ctx.cwd)}</span>,
});

const whoami: Command = () => ({
  output: <span className="text-[var(--color-terminal-text)]">{content.terminal.interactive.whoami}</span>,
});

const clear: Command = () => ({ output: null, clear: true });

const registry: Record<string, Command> = { help, ls, cd, cat, open, pwd, whoami, clear };

/* ── Entry point ────────────────────────────────────────────────────────── */

export function runCommand(rawInput: string, ctx: CommandContext): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) return { output: null };

  // Accept `/help` as an alias for `help`.
  const normalized = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const [name, ...args] = normalized.split(/\s+/);

  const handler = registry[name];
  if (!handler) {
    return {
      output: (
        <span className="text-[#ff8a8a]">
          {`zsh: command not found: ${name}`}
          <br />
          <span className="text-[var(--color-terminal-text)] opacity-80">
            Try basic shell commands. Type{' '}
            <span className="text-[var(--color-terminal-string)]">help</span> to see what's available.
          </span>
        </span>
      ),
    };
  }

  return handler(args, ctx);
}

export const commandNames = Object.keys(registry);

/* ── Tab completion ─────────────────────────────────────────────────────── */

export interface CompletionMatch {
  name: string;
  /** Trailing character to append on single-match completion. */
  trail: '/' | ' ';
}

export interface CompletionResult {
  matches: CompletionMatch[];
  /** Returns the new input value when a single match is applied. */
  applyMatch: (match: CompletionMatch) => string;
}

/**
 * Resolve a directory by user input, with the same home-fallback semantics as
 * findTarget. Used to decide which directory's children we should offer.
 */
function resolveDirForCompletion(cwd: Path, dirInput: string): FsDir | null {
  // Empty dirInput → current directory.
  const tryRel = getNode(filesystem, resolvePath(cwd, dirInput));
  if (tryRel?.type === 'dir') return tryRel;

  if (
    dirInput === '.' ||
    dirInput === '..' ||
    dirInput.startsWith('./') ||
    dirInput.startsWith('../')
  ) {
    return null;
  }

  const tryAbs = getNode(filesystem, resolvePath([], dirInput));
  if (tryAbs?.type === 'dir') return tryAbs;
  return null;
}

/**
 * Compute Tab-completion candidates for the current input.
 *
 * Rules:
 *   · Empty or unfinished first token → complete from command names.
 *   · Otherwise → complete the last whitespace-separated token as a path.
 */
export function getCompletions(input: string, cwd: Path): CompletionResult {
  const trailingSpace = /\s$/.test(input);
  const rawTokens = input.split(/\s+/);
  const tokens = rawTokens.filter((t) => t.length > 0);

  // Command-name completion: only when we're still on the first token and
  // there's no trailing space.
  if (tokens.length === 0 || (tokens.length === 1 && !trailingSpace)) {
    const prefix = tokens[0] ?? '';
    const matches: CompletionMatch[] = commandNames
      .filter((c) => c.startsWith(prefix))
      .map((name) => ({ name, trail: ' ' as const }));

    return {
      matches,
      applyMatch: (m) => m.name + m.trail,
    };
  }

  // Path completion on the last token.
  const last = trailingSpace ? '' : tokens[tokens.length - 1];
  const beforeLast = trailingSpace ? input : input.slice(0, input.length - last.length);

  const lastSlash = last.lastIndexOf('/');
  const dirPart = lastSlash >= 0 ? last.slice(0, lastSlash + 1) : '';
  const filePart = lastSlash >= 0 ? last.slice(lastSlash + 1) : last;

  const dirNode = resolveDirForCompletion(cwd, dirPart);
  if (!dirNode) {
    return { matches: [], applyMatch: () => input };
  }

  const matches: CompletionMatch[] = Object.entries(dirNode.children)
    .filter(([name]) => name.startsWith(filePart))
    .sort(([a], [b]) => sortNames(a, b))
    .map(([name, node]) => ({
      name,
      trail: (node as FsNode).type === 'dir' ? ('/' as const) : (' ' as const),
    }));

  return {
    matches,
    applyMatch: (m) => beforeLast + dirPart + m.name + m.trail,
  };
}
