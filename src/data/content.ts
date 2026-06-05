import { z } from 'zod';
import raw from './content.json';

/* ── Schemas ────────────────────────────────────────────────────────────── */

const SiteSchema = z.object({
  title: z.string(),
  url: z.string(),
  author: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  twitterDescription: z.string(),
  keywords: z.string(),
  ogTitle: z.string(),
  twitterTitle: z.string(),
});

const HeroSchema = z.object({
  name: z.string(),
  introPrefix: z.string(),
  currentCompany: z.object({ name: z.string(), url: z.string() }),
  tagline: z.string(),
  ctaPrompt: z.string(),
  ctaLabel: z.string(),
  ctaTargetId: z.string(),
});

const SectionSchema = z.object({ id: z.string(), label: z.string() });

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  technologies: z.array(z.string()),
  liveUrl: z.string(),
  sourceUrl: z.string(),
});

const PublicationSchema = z.object({
  title: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  liveUrl: z.string(),
});

const ExperienceSchema = z.object({
  company: z.string(),
  location: z.string(),
  year: z.string(),
  experience: z.string(),
  image: z.string(),
  imageAlt: z.string(),
});

const AchievementSchema = z.object({
  title: z.string(),
  year: z.string(),
  topic: z.string(),
  achievement: z.string(),
});

const CertificationSchema = z.object({
  title: z.string(),
  year: z.string(),
  description: z.string(),
  certLink: z.string(),
  image: z.string(),
});

const ContactLinkTypeSchema = z.enum(['email', 'linkedin', 'github']);
const ContactLinkSchema = z.object({
  type: ContactLinkTypeSchema,
  href: z.string(),
  label: z.string(),
  value: z.string(),
});

const ContactSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  links: z.array(ContactLinkSchema),
});

const FooterSchema = z.object({ author: z.string() });

/* ── Terminal schemas ───────────────────────────────────────────────────── */

const StaticTerminalOutputSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('string'), value: z.string() }),
  z.object({ kind: z.literal('array'), values: z.array(z.string()) }),
  z.object({
    kind: z.literal('mixed'),
    parts: z.array(
      z.discriminatedUnion('type', [
        z.object({ type: z.literal('text'), value: z.string() }),
        z.object({
          type: z.literal('link'),
          href: z.string(),
          label: z.string(),
          external: z.boolean().optional(),
        }),
      ]),
    ),
  }),
]);

const StaticTerminalLineSchema = z.object({
  command: z.string(),
  out: StaticTerminalOutputSchema,
});

const BannerHintPartSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), value: z.string() }),
  z.object({ type: z.literal('cmd'), value: z.string() }),
]);

const InteractiveContactLineSchema = z.object({
  label: z.string(),
  href: z.string(),
  displayHref: z.string(),
  external: z.boolean().optional(),
});

const TerminalResumeSchema = z.object({ url: z.string(), description: z.string() });

const InteractiveTerminalSchema = z.object({
  bannerTitle: z.string(),
  bannerHints: z.array(BannerHintPartSchema),
  whoami: z.string(),
  about: z.object({ bio: z.string() }),
  contactLines: z.array(InteractiveContactLineSchema),
  skills: z.string(),
  interests: z.array(z.string()),
  domains: z.array(z.string()),
  projectsText: z.string(),
  projectsSourceLink: z.object({ href: z.string(), label: z.string() }),
  experienceText: z.string(),
  educationText: z.string(),
  resume: TerminalResumeSchema,
});

const TerminalSchema = z.object({
  prompt: z.object({ user: z.string(), host: z.string() }),
  static: z.object({ lines: z.array(StaticTerminalLineSchema) }),
  interactive: InteractiveTerminalSchema,
});

const ContentSchema = z.object({
  site: SiteSchema,
  hero: HeroSchema,
  sections: z.array(SectionSchema),
  projects: z.array(ProjectSchema),
  publications: z.array(PublicationSchema),
  experiences: z.array(ExperienceSchema),
  achievements: z.array(AchievementSchema),
  certifications: z.array(CertificationSchema),
  contact: ContactSchema,
  footer: FooterSchema,
  terminal: TerminalSchema,
});

/* ── Inferred types ─────────────────────────────────────────────────────── */

export type Site = z.infer<typeof SiteSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type ContactLinkType = z.infer<typeof ContactLinkTypeSchema>;
export type ContactLink = z.infer<typeof ContactLinkSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Footer = z.infer<typeof FooterSchema>;
export type StaticTerminalOutput = z.infer<typeof StaticTerminalOutputSchema>;
export type Content = z.infer<typeof ContentSchema>;

/* ── Parse at module init — fails loud on JSON drift ───────────────────── */

const content = ContentSchema.parse(raw);

export default content;
