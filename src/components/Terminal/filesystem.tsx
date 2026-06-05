import type { ReactNode } from 'react';
import asciiArt from '../../assets/ascii-art.txt?raw';
import content from '../../data/content';

/* ── Types ──────────────────────────────────────────────────────────────── */

export type FsFile = { type: 'file'; content: ReactNode };
export type FsLink = { type: 'link'; opensUrl: string; description: string };
export type FsDir = { type: 'dir'; children: Record<string, FsNode> };
export type FsNode = FsFile | FsLink | FsDir;

/** A path is an array of segments rooted at the home directory (~). */
export type Path = readonly string[];

/* ── Path helpers ───────────────────────────────────────────────────────── */

/**
 * Resolve a user-typed path against the current working directory.
 * Supports `~`, `~/foo`, absolute `/foo`, relative `foo`, `.`, `..`.
 */
export function resolvePath(cwd: Path, input: string): Path {
  let segments: string[];
  let parts: string[];

  // Empty input means "current directory"; only `~` means home.
  if (input === '~') return [];
  if (input === '') return [...cwd];

  if (input.startsWith('~/')) {
    segments = [];
    parts = input.slice(2).split('/');
  } else if (input.startsWith('/')) {
    segments = [];
    parts = input.slice(1).split('/');
  } else {
    segments = [...cwd];
    parts = input.split('/');
  }

  for (const p of parts) {
    if (p === '' || p === '.') continue;
    if (p === '..') {
      if (segments.length > 0) segments.pop();
      continue;
    }
    segments.push(p);
  }

  return segments;
}

export function getNode(root: FsNode, path: Path): FsNode | null {
  let node: FsNode = root;
  for (const seg of path) {
    if (node.type !== 'dir') return null;
    const next = node.children[seg];
    if (!next) return null;
    node = next;
  }
  return node;
}

/**
 * Lookup a target by user input, trying:
 *   1. The path relative to cwd (standard shell behaviour).
 *   2. As a home-rooted path, so `ls education/info.txt` works from anywhere.
 *
 * Explicit relative prefixes (./ or ../) skip the fallback so the meaning of
 * "this directory" is preserved.
 */
export function findTarget(
  cwd: Path,
  input: string,
): { node: FsNode; path: Path } | null {
  const relPath = resolvePath(cwd, input);
  const relNode = getNode(filesystem, relPath);
  if (relNode) return { node: relNode, path: relPath };

  const isExplicitRelative =
    input === '.' || input === '..' || input.startsWith('./') || input.startsWith('../');
  if (isExplicitRelative) return null;

  const absPath = resolvePath([], input);
  const absNode = getNode(filesystem, absPath);
  if (absNode) return { node: absNode, path: absPath };

  return null;
}

export function pathString(path: Path): string {
  return path.length === 0 ? '~' : `~/${path.join('/')}`;
}

/* ── Inline link styles for file contents ───────────────────────────────── */

const link = (href: string, label: string, external = false) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="text-[var(--color-terminal-link)] hover:underline"
  >
    {label}
  </a>
);

/* ── About: ASCII art + bio ─────────────────────────────────────────────── */

const About = () => (
  <>
    <pre
      aria-label="ASCII art of the name 'Varun'"
      className="
        terminal-scrollbar
        mb-3 overflow-x-auto
        whitespace-pre
        font-[inherit] text-[var(--color-terminal-link)]
        leading-none
      "
    >
      {asciiArt.replace(/\s+$/g, '')}
    </pre>
    <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)]">
      {content.terminal.interactive.about.bio}
    </pre>
  </>
);

/* ── Filesystem tree ────────────────────────────────────────────────────── */

const { interactive } = content.terminal;

const aboutInfo: FsFile = { type: 'file', content: <About /> };

const contactInfo: FsFile = {
  type: 'file',
  content: (
    <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)]">
      {interactive.contactLines.map((c, i) => (
        <span key={c.label}>
          {c.label.padEnd(10, ' ')}
          {link(c.href, c.displayHref, c.external)}
          {i < interactive.contactLines.length - 1 ? '\n' : ''}
        </span>
      ))}
    </pre>
  ),
};

const skillsInfo: FsFile = {
  type: 'file',
  content: interactive.skills,
};

const interestsInfo: FsFile = {
  type: 'file',
  content: interactive.interests.map((i) => `- ${i}`).join('\n'),
};

const domainsInfo: FsFile = {
  type: 'file',
  content: interactive.domains.map((d) => `- ${d}`).join('\n'),
};

const projectsInfo: FsFile = {
  type: 'file',
  content: (
    <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)]">
      {interactive.projectsText}
      {link(interactive.projectsSourceLink.href, interactive.projectsSourceLink.label, true)}
    </pre>
  ),
};

const experienceInfo: FsFile = {
  type: 'file',
  content: interactive.experienceText,
};

const educationInfo: FsFile = {
  type: 'file',
  content: interactive.educationText,
};

const resumeLink: FsLink = {
  type: 'link',
  opensUrl: interactive.resume.url,
  description: interactive.resume.description,
};

export const filesystem: FsDir = {
  type: 'dir',
  children: {
    about: { type: 'dir', children: { 'info.txt': aboutInfo } },
    contact: { type: 'dir', children: { 'info.txt': contactInfo } },
    skills: { type: 'dir', children: { 'info.txt': skillsInfo } },
    interests: { type: 'dir', children: { 'info.txt': interestsInfo } },
    domains: { type: 'dir', children: { 'info.txt': domainsInfo } },
    projects: { type: 'dir', children: { 'info.txt': projectsInfo } },
    experience: { type: 'dir', children: { 'info.txt': experienceInfo } },
    education: { type: 'dir', children: { 'info.txt': educationInfo } },
    resume: { type: 'dir', children: { 'resume.pdf': resumeLink } },
  },
};
