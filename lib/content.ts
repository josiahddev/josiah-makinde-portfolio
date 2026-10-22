/**
 * All public site content, edited through the admin at /keystatic and stored in
 * content/*.json. Types come from the admin schema, so the two can't drift.
 *
 * Rule for editing content: if it isn't true, it doesn't go in. Empty fields
 * render honest empty states (or nothing) rather than placeholders.
 */
import type { Entry } from "@keystatic/core/reader";
import type keystatic from "../keystatic.config";

import aboutJson from "../content/about.json";
import contactJson from "../content/contact.json";
import credentialsJson from "../content/credentials.json";
import designJson from "../content/design.json";
import experienceJson from "../content/experience.json";
import handsOnJson from "../content/hands-on.json";
import heroJson from "../content/hero.json";
import labsJson from "../content/labs.json";
import learningJson from "../content/learning.json";
import projectsJson from "../content/projects.json";
import securityJson from "../content/security.json";
import siteJson from "../content/site.json";
import skillsJson from "../content/skills.json";

type Singletons = (typeof keystatic)["singletons"];
type Content<K extends keyof Singletons> = Entry<Singletons[K]>;

export const site = siteJson as Content<"site">;
export const hero = heroJson as Content<"hero">;
export const about = aboutJson as Content<"about">;
export const experience = experienceJson as Content<"experience">;
export const handsOn = handsOnJson as Content<"handsOn">;
export const skills = skillsJson as Content<"skills">;
export const projects = projectsJson as Content<"projects">;
export const security = securityJson as Content<"security">;
export const labs = labsJson as Content<"labs">;
export const design = designJson as Content<"design">;
export const learning = learningJson as Content<"learning">;
export const credentials = credentialsJson as Content<"credentials">;
export const contact = contactJson as Content<"contact">;

export type TimelineEntry = (typeof experience)["entries"][number];
export type SkillGroup = (typeof skills)["groups"][number];
export type SkillLevel = SkillGroup["level"];
export type Project = (typeof projects)["items"][number] & { slug: string; index: string };
export type ProjectStatus = Project["status"];
export type ProjectImage = { src: string; alt: string; caption: string };
export type Risk = (typeof security)["findings"][number]["risk"];
export type DesignProject = (typeof design)["items"][number] & { slug: string };
export type StepState = (typeof learning)["tracks"][number]["steps"][number]["state"];
export type Credential = (typeof credentials)["items"][number];

/** The site's address, falling back to the default if the admin value isn't a valid URL. */
export const siteUrl = (() => {
  try {
    return new URL(site.url).origin;
  } catch {
    return "https://josiah-makinde-portfolio.vercel.app";
  }
})();

/** URL-safe id from a title, used for element ids and anchors. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-") || "item";

/** Projects with derived ids, display numbers and a single resolved image list. */
export const projectList: Project[] = projects.items.map((p, i) => ({
  ...p,
  slug: slugify(p.title),
  index: String(i + 1).padStart(2, "0"),
}));

export const projectImages = (p: Project): ProjectImage[] =>
  p.images
    .map((img) => ({ src: img.upload || img.url, alt: img.alt, caption: img.caption }))
    .filter((img): img is ProjectImage => !!img.src);

export const designList: DesignProject[] = design.items.map((p) => ({ ...p, slug: slugify(p.title) }));

/** Section ids are fixed (they're anchors); labels come from content. */
export const nav = [
  { id: "top", label: site.nav.home },
  { id: "about", label: site.nav.about },
  { id: "experience", label: site.nav.experience },
  { id: "skills", label: site.nav.skills },
  { id: "projects", label: site.nav.projects },
  { id: "design", label: site.nav.design },
  { id: "learning", label: site.nav.learning },
  { id: "contact", label: site.nav.contact },
] as const;
