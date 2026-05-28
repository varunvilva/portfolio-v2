import type { ReactNode } from 'react';
import asciiArt from '../../assets/ascii-art.txt?raw';

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
{`Software engineer based in Bengaluru, India.

Currently at Kickdrum building backends, data systems, and the occasional
thoughtful UI. Previously interned at Jio Platforms on event-driven
notification infrastructure.

Comfortable across the stack — Go, Java/Spring, Python, React, Kafka, AWS.
Quietly opinionated about clean architecture and observable systems.`}
    </pre>
  </>
);

/* ── Filesystem tree ────────────────────────────────────────────────────── */

const aboutInfo: FsFile = { type: 'file', content: <About /> };

const contactInfo: FsFile = {
  type: 'file',
  content: (
    <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)]">
      {'email     '}{link('mailto:varunvilva1208@gmail.com', 'varunvilva1208@gmail.com')}{'\n'}
      {'linkedin  '}{link('https://linkedin.com/in/varunvilva', 'linkedin.com/in/varunvilva', true)}{'\n'}
      {'github    '}{link('https://github.com/varunvilva', 'github.com/varunvilva', true)}
    </pre>
  ),
};

const skillsInfo: FsFile = {
  type: 'file',
  content: `Languages       Go · Java · Python · TypeScript · SQL
Frameworks      Spring Boot · FastAPI · React · Node.js · Flask
Data & Streams  Apache Kafka · PostgreSQL · Redis
Cloud & DevOps  AWS (DEA certified) · Docker · Git`,
};

const interestsInfo: FsFile = {
  type: 'file',
  content: `- reading
- singing
- working out
- video games
- films & series`,
};

const domainsInfo: FsFile = {
  type: 'file',
  content: `- Software Development
- Data Engineering
- Machine Learning & AI
- DevOps (AWS)`,
};

const projectsInfo: FsFile = {
  type: 'file',
  content: (
    <pre className="whitespace-pre-wrap font-[inherit] text-[var(--color-terminal-text)]">
{`ISRO Safe Ship Navigation
─────────────────────────
Backend collaboration with VNIT Nagpur. Python + Flask.
  · Task queuing with Celery
  · A* routing
  · Caching for performance
  · Comprehensive error handling
  · Monitoring for reliability
Designed for real-time maritime navigation at scale.

Notification Microservice (Go + Kafka)
──────────────────────────────────────
Async event streaming with Apache Kafka.
  · Multi-channel delivery — email, SMS, push
  · Retries, monitoring, message ack semantics
  · Consumer-producer patterns built from scratch
Source: `}{link('https://github.com/varunvilva/NotificationGoKafka', 'github.com/varunvilva/NotificationGoKafka', true)}
    </pre>
  ),
};

const experienceInfo: FsFile = {
  type: 'file',
  content: `Kickdrum  ·  Bengaluru, India  ·  Jan 2025 — Present
────────────────────────────────────────────────────
Full stack: React + TypeScript, Java backends, AWS.
Some data engineering exposure.
Currently leading a hotel management system (client + admin portals),
designed for fault-tolerance and scale.

Jio Platforms  ·  Mumbai, India  ·  May — Aug 2024
──────────────────────────────────────────────────
Built a notification microservice from scratch.
FastAPI + Azure EventHub. Event-driven architecture with custom
failure-handling and retry logic.
Integrated Twilio + Gupshup for SMS / WhatsApp delivery.`,
};

const educationInfo: FsFile = {
  type: 'file',
  content: `B.Tech Computer Science & Engineering
IIIT Vadodara

B.Sc. Data Science and Programming
IIT Madras`,
};

const resumeLink: FsLink = {
  type: 'link',
  opensUrl: '/VarunVilvadrinath_Resume.pdf',
  description: 'PDF document — opens in a new tab',
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
