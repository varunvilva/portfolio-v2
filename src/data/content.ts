import raw from './content.json';

export interface NavItem {
  id: string;
  label: string;
}

export interface CurrentCompany {
  name: string;
  url: string;
}

export interface Hero {
  name: string;
  introPrefix: string;
  currentCompany: CurrentCompany;
  tagline: string;
  ctaPrompt: string;
  ctaLabel: string;
  ctaTargetId: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: readonly string[];
  liveUrl: string;
  sourceUrl: string;
}

export interface Publication {
  title: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
}

export interface Experience {
  company: string;
  location: string;
  year: string;
  experience: string;
  image: string;
  imageAlt: string;
}

export interface Achievement {
  title: string;
  year: string;
  topic: string;
  achievement: string;
}

export interface Certification {
  title: string;
  year: string;
  description: string;
  certLink: string;
  image: string;
}

export type ContactLinkType = 'email' | 'linkedin' | 'github';
export interface ContactLink {
  type: ContactLinkType;
  href: string;
  label: string;
  value: string;
}

export interface Contact {
  heading: string;
  subheading: string;
  links: readonly ContactLink[];
}

export interface Site {
  title: string;
  url: string;
  author: string;
  description: string;
  shortDescription: string;
  twitterDescription: string;
  keywords: string;
  ogTitle: string;
  twitterTitle: string;
}

export interface Footer {
  author: string;
}

/* ── Terminal types ─────────────────────────────────────────────────────── */

export type StaticTerminalOutput =
  | { kind: 'string'; value: string }
  | { kind: 'array'; values: string[] }
  | {
      kind: 'mixed';
      parts: Array<
        | { type: 'text'; value: string }
        | { type: 'link'; href: string; label: string; external?: boolean }
      >;
    };

export interface StaticTerminalLine {
  command: string;
  out: StaticTerminalOutput;
}

export type BannerHintPart =
  | { type: 'text'; value: string }
  | { type: 'cmd'; value: string };

export interface InteractiveContactLine {
  label: string;
  href: string;
  displayHref: string;
  external?: boolean;
}

export interface TerminalResume {
  url: string;
  description: string;
}

export interface InteractiveTerminal {
  bannerTitle: string;
  bannerHints: readonly BannerHintPart[];
  whoami: string;
  about: { bio: string };
  contactLines: readonly InteractiveContactLine[];
  skills: string;
  interests: readonly string[];
  domains: readonly string[];
  projectsText: string;
  projectsSourceLink: { href: string; label: string };
  experienceText: string;
  educationText: string;
  resume: TerminalResume;
}

export interface Terminal {
  prompt: { user: string; host: string };
  static: { lines: readonly StaticTerminalLine[] };
  interactive: InteractiveTerminal;
}

export interface Content {
  site: Site;
  hero: Hero;
  navbar: readonly NavItem[];
  projects: readonly Project[];
  publications: readonly Publication[];
  experiences: readonly Experience[];
  achievements: readonly Achievement[];
  certifications: readonly Certification[];
  contact: Contact;
  footer: Footer;
  terminal: Terminal;
}

const content = raw as unknown as Content;

export default content;
