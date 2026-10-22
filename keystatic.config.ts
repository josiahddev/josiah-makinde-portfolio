import { config, fields, singleton } from "@keystatic/core";

/**
 * Admin (Keystatic) schema. Every visible piece of the public site lives in
 * content/*.json and is edited here. Locally, saves write the files directly;
 * in production, saves are commits to GitHub, which Vercel redeploys.
 */

const EMPHASIS = "Wrap a word in *asterisks* to show it in the amber italic style.";

// ---- small field helpers ---------------------------------------------------
const text = (label: string, description?: string) => fields.text({ label, description });
const longText = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const list = (label: string, itemLabel = "Item", description?: string) =>
  fields.array(fields.text({ label: itemLabel }), { label, description, itemLabel: (p) => p.value || "(empty)" });
const sectionHeader = (defaults: { label: string }) => ({
  label: text("Small label", `Shown above the heading, e.g. “${defaults.label}”.`),
  title: text("Heading", EMPHASIS),
  lede: longText("Intro text", "The paragraph under the heading. Leave empty to hide it."),
});
const json = { data: "json" } as const;

const projectStatus = fields.select({
  label: "Status",
  options: [
    { label: "Working", value: "Working" },
    { label: "In progress", value: "In progress" },
    { label: "Learning project", value: "Learning project" },
    { label: "Planned", value: "Planned" },
  ],
  defaultValue: "In progress",
});

const level = (label: string) =>
  fields.select({
    label,
    options: [
      { label: "High", value: "High" },
      { label: "Medium", value: "Medium" },
      { label: "Low", value: "Low" },
    ],
    defaultValue: "Medium",
  });

export default config({
  // Local dev edits files directly. Production (and a one-off local setup run with
  // NEXT_PUBLIC_KEYSTATIC_GITHUB_SETUP=1) saves through GitHub instead.
  storage:
    process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_SETUP !== "1"
      ? { kind: "local" }
      : { kind: "github", repo: { owner: "josiahddev", name: "josiah-makinde-portfolio" } },

  ui: {
    brand: { name: "Josiah — site admin" },
    navigation: {
      "Top of page": ["site", "hero", "about"],
      "Experience & skills": ["experience", "handsOn", "skills"],
      Work: ["projects", "security", "labs", "design"],
      "Learning & contact": ["learning", "credentials", "contact"],
    },
  },

  singletons: {
    // ------------------------------------------------------------------ site
    site: singleton({
      label: "Site, navigation & footer",
      path: "content/site",
      format: json,
      schema: {
        name: text("Your name", "Shown in the navigation bar, footer and browser tab."),
        fullName: text("Full name", "Used in the footer copyright and for search engines."),
        title: text("Browser tab / Google title"),
        description: longText("Search & link-preview description", "What Google and LinkedIn previews show under the title."),
        url: text("Website address", "The live address, e.g. https://josiah-makinde-portfolio.vercel.app"),
        location: text("Location", "Shown in the hero, contact section and link previews. Leave empty to hide it everywhere."),
        jobTitle: text("Job title (for search engines only)"),
        worksFor: text("Employer (for search engines only)"),
        alumniOf: text("University (for search engines only)"),
        brandTag: text("Small text next to your name in the menu", "e.g. ~/it/systems/security"),
        nav: fields.object(
          {
            home: text("Home"),
            about: text("About"),
            experience: text("Experience"),
            skills: text("Skills"),
            projects: text("Projects"),
            design: text("Design"),
            learning: text("Learning"),
            contact: text("Contact"),
          },
          { label: "Menu labels" },
        ),
        cvButton: text("“Download CV” button text"),
        cvPending: text("Button text when no CV is available"),
        og: fields.object(
          {
            kicker: text("Small top line"),
            tagline: text("Tagline under your name"),
            footer: text("Bottom line", "Leave empty to hide."),
          },
          { label: "Link-preview image (what LinkedIn/WhatsApp show)" },
        ),
        footer: fields.object(
          {
            tagline: text("Tagline under your name"),
            note: text("Text after the copyright"),
            terminal: fields.array(
              fields.object({
                text: text("Line"),
                tone: fields.select({
                  label: "Style",
                  options: [
                    { label: "Command (bright)", value: "command" },
                    { label: "Output (grey)", value: "output" },
                    { label: "Highlight (amber)", value: "accent" },
                  ],
                  defaultValue: "output",
                }),
              }),
              { label: "Hidden footer terminal (the >_ button)", itemLabel: (p) => p.fields.text.value || "(empty)" },
            ),
          },
          { label: "Footer" },
        ),
      },
    }),

    // ------------------------------------------------------------------ hero
    hero: singleton({
      label: "Hero (top of page)",
      path: "content/hero",
      format: json,
      schema: {
        statusLabel: text("Status line — first part", "e.g. “Currently building”"),
        statusValue: text("Status line — second part", "e.g. “IT Support + Cybersecurity”"),
        headline: list("Headline lines", "Line", "Each line of the big heading, top to bottom."),
        headlineAccent: text("Last headline line (amber italic)", "e.g. “Security.”"),
        annotation: text("Small note beside the last line", "e.g. “← in progress”. Leave empty to hide."),
        intro: longText("Intro paragraph"),
        primaryCta: text("Main button text", "Scrolls to Projects."),
        secondaryCta: text("Second button text", "Scrolls to Contact."),
        facts: fields.array(
          fields.object({ label: text("Label"), value: text("Value") }),
          {
            label: "Fact strip under the hero",
            description: "Facts with an empty value are hidden.",
            itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}`,
          },
        ),
        console: fields.object(
          {
            windowTitle: text("Window title"),
            prompt: text("Prompt", "e.g. josiah@kaduna:~$"),
            summary: longText("Screen-reader summary", "Read aloud instead of the typing animation."),
            lines: fields.array(
              fields.object({
                kind: fields.select({
                  label: "Type",
                  options: [
                    { label: "Command (typed out)", value: "cmd" },
                    { label: "Output line", value: "out" },
                    { label: "Blank gap", value: "gap" },
                  ],
                  defaultValue: "out",
                }),
                text: text("Text", "Spaces are kept, so you can line up columns."),
                accent: fields.checkbox({ label: "Show in amber", defaultValue: false }),
              }),
              {
                label: "Terminal lines",
                itemLabel: (p) =>
                  p.fields.kind.value === "gap" ? "— gap —" : `${p.fields.kind.value === "cmd" ? "$ " : ""}${p.fields.text.value}`,
              },
            ),
          },
          { label: "Terminal panel" },
        ),
      },
    }),

    // ----------------------------------------------------------------- about
    about: singleton({
      label: "About",
      path: "content/about",
      format: json,
      schema: {
        label: text("Small label"),
        heading: longText("Heading", EMPHASIS),
        photo: fields.image({
          label: "Photo",
          description: "Portrait, ideally 4:5 (e.g. 960×1200). Shown in black and white until hovered.",
          directory: "public/images",
          publicPath: "/images/",
        }),
        photoAlt: text("Photo description (for screen readers)"),
        captionLeft: text("Caption under photo — left"),
        captionRight: text("Caption under photo — right", "Leave empty to hide."),
        paragraphs: fields.array(
          fields.object({
            text: longText("Paragraph"),
            highlight: fields.checkbox({ label: "Show brighter (for a closing line)", defaultValue: false }),
          }),
          { label: "Paragraphs", itemLabel: (p) => p.fields.text.value.slice(0, 70) + "…" },
        ),
        facts: fields.array(fields.object({ label: text("Label"), value: text("Value") }), {
          label: "Quick facts",
          itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}`,
        }),
      },
    }),

    // ------------------------------------------------------------ experience
    experience: singleton({
      label: "Experience timeline",
      path: "content/experience",
      format: json,
      schema: {
        ...sectionHeader({ label: "Experience" }),
        kindLabels: fields.object(
          { work: text("Work"), education: text("Education"), now: text("Current") },
          { label: "Entry type labels" },
        ),
        entries: fields.array(
          fields.object({
            period: text("Dates", "e.g. 2024 — Present"),
            role: text("Role / qualification"),
            org: text("Organisation"),
            place: text("Place", "Leave empty to hide."),
            kind: fields.select({
              label: "Type",
              options: [
                { label: "Work", value: "work" },
                { label: "Education", value: "education" },
                { label: "Now (shows the ‘building’ chips)", value: "now" },
              ],
              defaultValue: "work",
            }),
            note: text("Small amber note", "Optional, e.g. NYSC — Place of Primary Assignment"),
            points: list("Bullet points", "Point"),
          }),
          { label: "Entries (most recent first)", itemLabel: (p) => `${p.fields.period.value} — ${p.fields.role.value}` },
        ),
        nowBuilding: list("‘Building deeper skills’ chips", "Skill", "Shown on the entry whose type is “Now”."),
      },
    }),

    // --------------------------------------------------------------- hands-on
    handsOn: singleton({
      label: "Hands-on",
      path: "content/hands-on",
      format: json,
      schema: {
        ...sectionHeader({ label: "Hands-on" }),
        areas: fields.array(
          fields.object({ area: text("Area"), detail: longText("Description"), tags: list("Tags", "Tag") }),
          { label: "Areas", itemLabel: (p) => p.fields.area.value },
        ),
        fieldNotes: fields.object(
          {
            kicker: text("Small label"),
            title: text("Title"),
            text: longText("Text"),
            caption: text("Caption under the sketch"),
          },
          { label: "Side panel (network sketch)" },
        ),
        diagram: fields.object(
          Object.fromEntries(
            (
              [
                ["power", "Box: power"],
                ["servers", "Box: servers"],
                ["switches", "Box: switches (centre, amber)"],
                ["wireless", "Box: wireless"],
                ["wired", "Box: wired LAN"],
                ["laptops", "Box: laptops"],
                ["testing", "Box: testing systems"],
              ] as const
            ).map(([key, label]) => [
              key,
              fields.object({ label: text("Label"), sub: text("Small text") }, { label }),
            ]),
          ),
          { label: "Network sketch labels" },
        ),
        environment: list("Equipment list (read to screen readers)", "Item"),
      },
    }),

    // ----------------------------------------------------------------- skills
    skills: singleton({
      label: "Skills",
      path: "content/skills",
      format: json,
      schema: {
        ...sectionHeader({ label: "Skills" }),
        levels: fields.object(
          {
            daily: text("Level 1 (filled square)"),
            working: text("Level 2 (half square)"),
            learning: text("Level 3 (dashed square)"),
          },
          { label: "Level names" },
        ),
        expandAll: text("“Expand all” text"),
        collapseAll: text("“Collapse all” text"),
        groups: fields.array(
          fields.object({
            name: text("Group name"),
            level: fields.select({
              label: "Level",
              options: [
                { label: "Level 1 — use at work", value: "daily" },
                { label: "Level 2 — working knowledge", value: "working" },
                { label: "Level 3 — currently learning", value: "learning" },
              ],
              defaultValue: "working",
            }),
            summary: text("One-line summary"),
            items: list("Skills", "Skill"),
          }),
          { label: "Skill groups", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    // --------------------------------------------------------------- projects
    projects: singleton({
      label: "Projects",
      path: "content/projects",
      format: json,
      schema: {
        ...sectionHeader({ label: "Projects" }),
        labels: fields.object(
          {
            featured: text("“Featured” tag"),
            components: text("“Components” heading"),
            problem: text("“Problem” label"),
            approach: text("“Approach” label"),
            result: text("“Result” label"),
            pending: text("Text for an empty Problem/Approach/Result"),
            repoLink: text("GitHub link text"),
            repoPending: text("Text when there’s no GitHub link"),
            screenshotsPending: text("Text when there are no screenshots"),
          },
          { label: "Labels" },
        ),
        items: fields.array(
          fields.object({
            title: text("Title"),
            summary: longText("Summary"),
            stack: list("Technologies", "Technology"),
            status: projectStatus,
            repo: text("GitHub link", "Leave empty to show “coming soon”."),
            problem: longText("Problem", "Leave empty to show “More details coming soon”."),
            approach: longText("Approach"),
            result: longText("Result"),
            images: fields.array(
              fields.object({
                upload: fields.image({
                  label: "Upload a screenshot",
                  directory: "public/projects",
                  publicPath: "/projects/",
                }),
                url: text("…or an image link", "Used only when nothing is uploaded above."),
                alt: text("Description (for screen readers)"),
                caption: text("Caption"),
              }),
              { label: "Screenshots (first one is shown first)", itemLabel: (p) => p.fields.caption.value || "(no caption)" },
            ),
            components: fields.array(fields.object({ name: text("Name"), status: projectStatus }), {
              label: "Components (optional)",
              itemLabel: (p) => `${p.fields.name.value} — ${p.fields.status.value}`,
            }),
          }),
          {
            label: "Projects (the first one is shown large as “Featured”)",
            itemLabel: (p) => `${p.fields.title.value} — ${p.fields.status.value}`,
          },
        ),
        earlierLabel: text("“Earlier web practice” label"),
        earlier: fields.array(
          fields.object({ name: text("Name"), href: text("Link"), note: text("Short note") }),
          { label: "Earlier web practice links", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    // --------------------------------------------------------------- security
    security: singleton({
      label: "Security assessment",
      path: "content/security",
      format: json,
      schema: {
        show: fields.checkbox({ label: "Show this section", defaultValue: true }),
        tag: text("Tag"),
        kicker: text("Small line beside the tag"),
        title: text("Title"),
        summary: longText("Summary"),
        scenarioLabel: text("Scenario label"),
        scenario: longText("Scenario note"),
        findingsLabel: text("“Findings” label"),
        teamLabel: text("“Team” label"),
        team: text("Team / your role"),
        findings: fields.array(
          fields.object({
            system: text("System"),
            name: text("Finding"),
            service: text("Service · port"),
            likelihood: level("Likelihood"),
            impact: level("Impact"),
            risk: level("Overall risk"),
            control: text("Recommended fix"),
          }),
          { label: "Findings table", itemLabel: (p) => `${p.fields.risk.value} — ${p.fields.name.value}` },
        ),
        policiesLabel: text("Policies heading"),
        policies: list("Policies", "Policy"),
        takeawayLabel: text("Takeaway heading"),
        takeaway: longText("Takeaway"),
        tools: list("Tools", "Tool"),
        footnote: text("Small note at the bottom", "Leave empty to hide."),
        labels: fields.object(
          {
            finding: text("Column: finding"),
            service: text("Column: service"),
            likelihood: text("Column: likelihood"),
            impact: text("Column: impact"),
            risk: text("Column: risk"),
            control: text("Column: recommended control"),
            fix: text("“Fix:” (phone layout)"),
            findingsSummary: text(
              "Findings summary line",
              "{count}, {systems} and {high} are filled in automatically from the table.",
            ),
          },
          { label: "Table labels" },
        ),
      },
    }),

    // ------------------------------------------------------------------- labs
    labs: singleton({
      label: "Lab log",
      path: "content/labs",
      format: json,
      schema: {
        show: fields.checkbox({ label: "Show the lab log", defaultValue: true }),
        kicker: text("Small label"),
        title: text("Title"),
        text: longText("Text"),
        footnote: text("Small note", "Leave empty to hide."),
        windowTitle: text("Panel title"),
        dateRange: text("Date range (top right of panel)"),
        doneTag: text("Tag on each lab", "e.g. [done]"),
        countLabel: text("Word after the lab count", "e.g. “completed” → “6 completed”"),
        items: fields.array(
          fields.object({
            id: text("Lab number", "e.g. 3.3.3"),
            title: text("Lab title"),
            topic: text("Topic", "e.g. Build, Services"),
            date: text("Date completed", "e.g. Jun 2024"),
          }),
          { label: "Completed labs", itemLabel: (p) => `${p.fields.id.value} ${p.fields.title.value}` },
        ),
      },
    }),

    // ----------------------------------------------------------------- design
    design: singleton({
      label: "Design case studies",
      path: "content/design",
      format: json,
      schema: {
        ...sectionHeader({ label: "Design" }),
        behance: text("Behance link", "Leave empty to show “coming soon”."),
        behanceLabel: text("Behance link text"),
        behancePending: text("Text when there’s no Behance link"),
        labels: fields.object(
          {
            open: text("“Open case study”"),
            next: text("“Next case study”"),
            close: text("“Close”"),
            caseStudy: text("“case study” (reader header)"),
            decisions: text("“Key design decisions”"),
            role: text("“Role”"),
            type: text("“Type”"),
            tools: text("“Tools”"),
            year: text("“Year”"),
            challenge: text("“Challenge”"),
            approach: text("“Approach”"),
            outcome: text("“Outcome”"),
          },
          { label: "Labels" },
        ),
        items: fields.array(
          fields.object({
            title: text("Title"),
            category: text("Category", "e.g. Hotel booking website"),
            tagline: longText("Tagline"),
            role: text("Role"),
            type: text("Type"),
            tools: text("Tools"),
            year: text("Year"),
            challenge: longText("Challenge"),
            approach: longText("Approach"),
            outcome: longText("Outcome"),
            decisions: fields.array(fields.object({ title: text("Title"), detail: longText("Detail") }), {
              label: "Key design decisions",
              itemLabel: (p) => p.fields.title.value,
            }),
            cover: fields.image({
              label: "Cover image",
              description: "Landscape, about 808×632 (or double).",
              directory: "public/design",
              publicPath: "/design/",
            }),
            slides: fields.array(
              fields.object({
                image: fields.image({ label: "Image", directory: "public/design", publicPath: "/design/" }),
                caption: text("Caption"),
                width: fields.integer({ label: "Width in px (optional)", description: "Helps the page avoid jumping while images load." }),
                height: fields.integer({ label: "Height in px (optional)" }),
              }),
              { label: "Slides", itemLabel: (p) => p.fields.caption.value || "(no caption)" },
            ),
          }),
          { label: "Case studies (the first one is shown large)", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    // --------------------------------------------------------------- learning
    learning: singleton({
      label: "Learning path",
      path: "content/learning",
      format: json,
      schema: {
        ...sectionHeader({ label: "Learning" }),
        stepLabels: fields.object(
          { done: text("Done"), current: text("Current"), next: text("Next") },
          { label: "Step state labels" },
        ),
        tracks: fields.array(
          fields.object({
            name: text("Track name"),
            why: longText("Why this track"),
            steps: fields.array(
              fields.object({
                label: text("Step"),
                state: fields.select({
                  label: "State",
                  options: [
                    { label: "Done", value: "done" },
                    { label: "Current", value: "current" },
                    { label: "Next", value: "next" },
                  ],
                  defaultValue: "next",
                }),
              }),
              { label: "Steps", itemLabel: (p) => `${p.fields.label.value} — ${p.fields.state.value}` },
            ),
          }),
          { label: "Tracks (tabs)", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    // ------------------------------------------------------------ credentials
    credentials: singleton({
      label: "Certificates & training",
      path: "content/credentials",
      format: json,
      schema: {
        title: text("Heading"),
        text: longText("Intro text", EMPHASIS),
        verifyLabel: text("“Verify on Credly” link text"),
        groups: fields.object(
          {
            badge: fields.object({ title: text("Title"), note: text("Note") }, { label: "Badges group" }),
            inProgress: fields.object({ title: text("Title"), note: text("Note") }, { label: "In-progress group" }),
            course: fields.object({ title: text("Title"), note: text("Note") }, { label: "Courses group" }),
          },
          { label: "Group headings" },
        ),
        typeLabels: fields.object(
          { badge: text("Badge"), course: text("Course"), inProgress: text("In progress") },
          { label: "Shown instead of a date when the date is empty" },
        ),
        items: fields.array(
          fields.object({
            name: text("Name"),
            issuer: text("Issuer"),
            date: text("Date", "e.g. Feb 2026. Leave empty if unknown."),
            type: fields.select({
              label: "Type",
              options: [
                { label: "Badge (verified)", value: "badge" },
                { label: "Course / training", value: "course" },
                { label: "In progress", value: "inProgress" },
              ],
              defaultValue: "course",
            }),
            note: text("Note", "Optional extra line."),
            url: text("Verification link", "e.g. the Credly badge page. Optional."),
          }),
          { label: "Certificates", itemLabel: (p) => `${p.fields.name.value} (${p.fields.type.value})` },
        ),
      },
    }),

    // ---------------------------------------------------------------- contact
    contact: singleton({
      label: "Contact & CV",
      path: "content/contact",
      format: json,
      schema: {
        ...sectionHeader({ label: "Contact" }),
        email: text("Email address"),
        linkedin: text("LinkedIn link"),
        linkedinLabel: text("LinkedIn display text"),
        github: text("GitHub link"),
        githubHandle: text("GitHub username"),
        credly: text("Credly profile link", "Leave empty to hide."),
        cv: fields.object(
          {
            file: fields.file({
              label: "CV (PDF)",
              description: "Uploading replaces the CV everyone downloads. Check it has no private details first.",
              directory: "public/cv",
              publicPath: "/cv/",
            }),
            available: fields.checkbox({ label: "Show the CV download", defaultValue: true }),
          },
          { label: "CV" },
        ),
        labels: fields.object(
          {
            email: text("Email"),
            linkedin: text("LinkedIn"),
            github: text("GitHub"),
            badges: text("Badges"),
            badgesValue: text("Badges link text"),
            location: text("Location"),
            cv: text("CV"),
            cvDownload: text("Download link text"),
            cvView: text("View link text"),
            cvPending: text("Text when no CV is shown"),
          },
          { label: "Row labels" },
        ),
        form: fields.object(
          {
            title: text("Form title"),
            subtitle: text("Form subtitle"),
            name: text("Name field label"),
            email: text("Email field label"),
            subject: text("Subject field label"),
            message: text("Message field label"),
            note: longText("Small note beside the button"),
            button: text("Button text"),
            success: longText("Message after sending", "Your email address is added after this text."),
          },
          { label: "Contact form" },
        ),
      },
    }),
  },
});
