/**
 * Single source of truth for every piece of personal content on the site.
 *
 * Rule for editing this file: if it isn't true, it doesn't go in.
 * Anything unknown is `null` and the UI renders an honest empty state.
 */

export const site = {
  // Live address — used for the canonical URL, Open Graph, JSON-LD, robots and sitemap.
  url: "https://josiah-makinde-portfolio.vercel.app",
  name: "Josiah Makinde",
  fullName: "Makinde Ifeoluwa Josiah",
  title: "Josiah Makinde — IT Support & Cybersecurity",
  description:
    "IT support and ICT professional in Kaduna, Nigeria. Hands-on with Windows, hardware, networks and users — and deliberately building toward cybersecurity.",
  location: "Kaduna, Nigeria",
};

export const contact = {
  email: "josiahchrismakinde@gmail.com",
  linkedin: "https://www.linkedin.com/in/josiah-makinde-2a55011b7",
  github: "https://github.com/josiahddev",
  githubHandle: "josiahddev",
  // TODO: add the Behance profile URL — the Design section shows "coming soon" until then.
  behance: null as string | null,
  credly: "https://www.credly.com/users/ifeoluwa-makinde.c08160c9",
  cv: {
    href: "/cv/Josiah-Makinde-CV.pdf",
    // Flip to false to show the "CV upload pending" state instead of a link.
    available: true,
  },
};

export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "design", label: "Design" },
  { id: "learning", label: "Learning" },
  { id: "contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  place: string;
  kind: "work" | "education" | "now";
  note?: string;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    role: "Building deeper skills",
    org: "Self-directed",
    place: "Alongside work",
    kind: "now",
    points: [],
  },
  {
    period: "2024 — Present",
    role: "ICT Manager",
    org: "Chris Makinde & Co Chartered Accountants",
    place: "Kaduna",
    kind: "work",
    note: "IT support & operations for the whole office",
    points: [
      "Run day-to-day IT: systems, network, user accounts and the IT asset inventory.",
      "Maintain backup routines, security controls and who-has-access-to-what.",
      "Install, configure and maintain hardware and software — and keep machines healthy so problems don't start.",
      "First-line and escalated support for every member of staff.",
      "Work with management to line IT priorities up with what the firm actually needs.",
    ],
  },
  {
    period: "2023",
    role: "IT Support",
    org: "Armed Forces Command and Staff College (AFCSC)",
    place: "Jaji, Kaduna",
    kind: "work",
    note: "NYSC — Place of Primary Assignment",
    points: [
      "First-level support for staff: desktops, laptops and office equipment.",
      "Regular system backups; coordinated hardware and software updates.",
      "Configured devices and helped keep daily IT running smoothly.",
      "Escalated complex incidents to senior IT and documented the fixes for next time.",
    ],
  },
  {
    period: "2022",
    role: "B.Sc. Computer Science",
    org: "Mountain Top University",
    place: "Ogun State",
    kind: "education",
    points: [],
  },
  {
    period: "May — Oct 2021",
    role: "IT Support Intern",
    org: "Peugeot Automobile Nigeria",
    place: "Pan Drive, Kakuri, Kaduna",
    kind: "work",
    points: [
      "User support for Microsoft Office, Windows PCs, printers and peripherals.",
      "Helped plan and coordinate data migrations from Windows Server, plus system and software upgrades.",
      "Remote and phone helpdesk support.",
      "Hardware, software and network troubleshooting, including antivirus and firewall configuration.",
      "Tested new hardware and software before it went out to users.",
    ],
  },
];

export const nowBuilding = [
  "Networking",
  "Linux",
  "Windows administration",
  "Active Directory",
  "Microsoft 365",
  "Entra ID",
  "Cybersecurity",
  "SIEM",
  "Vulnerability management",
  "Scripting",
];

/* ------------------------------------------------------------------ */
/* Hands-on exposure                                                    */
/* ------------------------------------------------------------------ */

export const handsOn = [
  {
    area: "Windows support",
    detail:
      "Slow machines, broken updates, apps that won't open, profiles that won't load. Most of my working day starts here.",
    tags: ["Windows 10/11", "Microsoft Office", "User profiles"],
  },
  {
    area: "Hardware",
    detail:
      "Desktops, laptops, printers and peripherals — unboxing, setting up, diagnosing and keeping them running.",
    tags: ["PCs & laptops", "Printers", "Peripherals"],
  },
  {
    area: "Networking",
    detail:
      "The practical end: IP addressing, DHCP, LAN/WAN, and working out why one machine can't see the printer everyone else can.",
    tags: ["IP / DHCP", "LAN / WAN", "Connectivity"],
  },
  {
    area: "Accounts, access & backups",
    detail:
      "Creating and removing user accounts, keeping access sensible, and making sure there's a backup before anyone needs one.",
    tags: ["User accounts", "Access control", "Backups"],
  },
  {
    area: "Security basics at work",
    detail:
      "Antivirus and firewall configuration, security awareness with staff, and treating data like it belongs to a client — because at an accounting firm it does.",
    tags: ["Antivirus", "Firewall", "Awareness"],
  },
];

export const schoolIct = [
  "80+ HP ProBook laptops",
  "Network switches",
  "Wireless access points",
  "LAN cabling",
  "CBT (computer-based testing) systems",
  "Windows machines",
  "Servers",
  "Power / UPS",
];

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */

/** How I actually use a skill — shown as text, never as a colour alone. */
export type SkillLevel = "daily" | "working" | "learning";

export const skillLevelLabel: Record<SkillLevel, string> = {
  daily: "Use at work",
  working: "Working knowledge",
  learning: "Currently learning",
};

export type SkillGroup = {
  name: string;
  level: SkillLevel;
  summary: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "IT Support",
    level: "daily",
    summary: "The core of my job.",
    items: [
      "Windows",
      "PC troubleshooting",
      "Hardware troubleshooting",
      "Software troubleshooting",
      "Printer support",
      "Microsoft Office",
      "User support",
      "IT asset management",
      "Installation & configuration",
      "System maintenance",
      "Incident documentation & escalation",
    ],
  },
  {
    name: "Networking",
    level: "working",
    summary: "Comfortable troubleshooting; still going deeper.",
    items: [
      "TCP/IP fundamentals",
      "IP addressing",
      "DHCP",
      "DNS fundamentals",
      "LAN / WAN",
      "Network devices",
      "Connectivity troubleshooting",
      "Cisco Packet Tracer",
    ],
  },
  {
    name: "Systems",
    level: "working",
    summary: "Windows day to day, Linux on the command line.",
    items: ["Windows", "Basic Linux CLI", "User accounts", "Backups", "Basic system administration"],
  },
  {
    name: "Microsoft ecosystem",
    level: "learning",
    summary: "Fundamentals, building toward admin work.",
    items: ["Microsoft 365", "Microsoft Entra ID", "Active Directory"],
  },
  {
    name: "Tools & languages",
    level: "working",
    summary: "What I script and build with.",
    items: ["PowerShell", "Python", "C", "JavaScript", "HTML", "CSS", "Git", "GitHub", "Jira"],
  },
  {
    name: "UI/UX design",
    level: "working",
    summary: "Six solo case studies in Figma — see the Design section.",
    items: ["Figma", "Wireframing", "Style guides", "Component libraries", "High-fidelity screens", "Landing pages", "Booking flows"],
  },
  {
    name: "Cybersecurity",
    level: "learning",
    summary: "Studying the concepts, practising in labs, applying the basics at work.",
    items: [
      "Security fundamentals",
      "Security monitoring concepts",
      "SIEM concepts",
      "Vulnerability management concepts",
      "Network security fundamentals",
      "Windows security fundamentals",
      "Cloud security fundamentals",
      "Vulnerability assessment (lab)",
      "Nmap",
      "Metasploit (lab)",
      "Kali Linux",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "Working" | "In progress" | "Learning project" | "Planned";

export type ProjectImage = { src: string; alt: string; caption: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  stack: string[];
  status: ProjectStatus;
  repo: string | null;
  problem: string | null;
  approach: string | null;
  result: string | null;
  images: ProjectImage[];
  components?: { name: string; status: ProjectStatus }[];
};

const shot = (file: string) =>
  `https://raw.githubusercontent.com/josiahddev/windows-system-health-checker/HEAD/Screenshots/${file}`;

export const projects: Project[] = [
  {
    slug: "pc-health-check",
    index: "01",
    title: "Windows System Health Checker",
    summary:
      "A PowerShell script that gives a first-pass diagnostic of a Windows PC in one run — instead of opening Task Manager, Settings and a command prompt one after another.",
    stack: ["PowerShell", "CIM / WMI", "Test-Connection", "Get-HotFix"],
    status: "Working",
    repo: "https://github.com/josiahddev/windows-system-health-checker",
    problem:
      "When someone says “my computer is slow”, the first ten minutes are always the same: uptime, memory, disk space, CPU, network, last update. Checked one by one, by hand.",
    approach:
      "Pull the data straight from Windows through CIM/WMI classes (Win32_OperatingSystem, Win32_LogicalDisk, Win32_Processor), convert kilobytes and bytes into readable GB, then finish with a summary that flags what actually needs attention — low RAM, no internet.",
    result:
      "One command, one readable report. Along the way I hit an encoding bug that broke the parser with a confusing error — which taught me to be careful with characters in PowerShell scripts.",
    images: [
      { src: shot("10-summary.png"), alt: "PowerShell window with the full health check report and summary, beside the script open in VS Code", caption: "Full run — report and summary" },
      { src: shot("06-disk-space.png"), alt: "Terminal output listing total, used and free space per drive", caption: "Disk space per drive" },
      { src: shot("05-ram-usage.png"), alt: "Terminal output showing total, used and free RAM", caption: "RAM usage" },
      { src: shot("08-network-check.png"), alt: "Terminal output confirming internet reachability", caption: "Network connectivity" },
      { src: shot("04-uptime.png"), alt: "Terminal output showing system uptime in days, hours and minutes", caption: "Uptime since last reboot" },
      { src: shot("09-windows-update.png"), alt: "Terminal output showing the most recently installed Windows update", caption: "Last Windows update" },
      { src: shot("07-cpu-usage.png"), alt: "Terminal output showing CPU usage percentage", caption: "CPU usage" },
      { src: shot("01-computer-name.png"), alt: "Terminal output showing the computer name", caption: "Computer name" },
      { src: shot("02-current-user.png"), alt: "Terminal output showing the logged-in user", caption: "Current user" },
      { src: shot("03-windows-version.png"), alt: "Terminal output showing the installed Windows version", caption: "Windows version" },
    ],
  },
  {
    slug: "windows-troubleshooting-toolkit",
    index: "02",
    title: "Windows Troubleshooting Toolkit",
    summary:
      "A growing set of small utilities for the problems I see most at work — each one a chance to get better at PowerShell and Windows internals.",
    stack: ["PowerShell", "Windows"],
    status: "In progress",
    repo: null,
    problem:
      "The same handful of issues come up again and again: what's installed on this machine, what does the event log say, why won't the printer print, why is there no network.",
    approach: null,
    result: null,
    images: [],
    components: [
      { name: "Software Inventory Scanner", status: "Planned" },
      { name: "Event Log Analyzer", status: "Planned" },
      { name: "Printer Diagnostic Tool", status: "Planned" },
      { name: "Network Troubleshooting", status: "Planned" },
      { name: "Windows Troubleshooting", status: "Planned" },
    ],
  },
  {
    slug: "it-ticket-workflow",
    index: "03",
    title: "IT Support Ticket Workflow",
    summary:
      "A hands-on practice setup in Jira Service Management modelling a basic helpdesk flow — how a ticket moves from reported to resolved.",
    stack: ["Jira Service Management", "Jira"],
    status: "Learning project",
    repo: null,
    problem:
      "I document and escalate incidents at work already. I wanted to understand how a proper ticketing tool structures that same process.",
    approach:
      "Built a simple workflow with the statuses a support team actually uses: To Do → In Progress → Waiting for Customer → Resolved.",
    result: null,
    images: [],
  },
];

/**
 * Group vulnerability assessment, July 2026. "Apex Healthcare Solutions" is a
 * fictional client scenario; targets were deliberately vulnerable lab VMs.
 * Figures come from the report's risk tables.
 */
export type Risk = "High" | "Medium";

export const securityAssessment = {
  title: "Securing legacy systems at “Apex Healthcare”",
  kicker: "Vulnerability assessment · Group project · Jul 2026",
  scenario:
    "Apex Healthcare Solutions is a fictional client. The targets were Kioptrix and Metasploitable 2 — deliberately vulnerable machines built for security training — scanned inside an isolated lab.",
  team: "Team of 8 — I prepared the final report",
  summary:
    "We scanned both systems, matched what was running against known vulnerabilities, rated each finding by likelihood and impact, and wrote up the controls and policies a healthcare organisation would need — with HIPAA in mind.",
  takeaway:
    "None of it needed a redesign. Every finding traced back to basics: software nobody patched, services nobody should still be running, and passwords nobody changed.",
  tools: ["Kali Linux", "Nmap", "Searchsploit", "Metasploit"],
  findings: [
    { system: "Kioptrix", name: "Samba 2.2.1 buffer overflow", service: "SMB · 445", likelihood: "High", impact: "High", risk: "High", control: "Patch / upgrade Samba" },
    { system: "Kioptrix", name: "Apache mod_ssl overflow", service: "HTTPS · 443", likelihood: "Medium", impact: "High", risk: "High", control: "Patch + segment web servers" },
    { system: "Kioptrix", name: "Weak MySQL credentials", service: "MySQL · 3306", likelihood: "High", impact: "Medium", risk: "Medium", control: "Strong passwords + restrict network access" },
    { system: "Metasploitable 2", name: "vsftpd 2.3.4 backdoor", service: "FTP · 21", likelihood: "High", impact: "High", risk: "High", control: "Replace vsftpd with a verified version" },
    { system: "Metasploitable 2", name: "Telnet enabled", service: "Telnet · 23", likelihood: "High", impact: "Medium", risk: "High", control: "Disable Telnet, use SSH" },
    { system: "Metasploitable 2", name: "Outdated Apache 2.2.8", service: "HTTP · 80", likelihood: "Medium", impact: "Medium", risk: "Medium", control: "Upgrade Apache" },
  ] satisfies { system: string; name: string; service: string; likelihood: Risk; impact: Risk; risk: Risk; control: string }[],
  policies: [
    "Patch & end-of-life software management",
    "Secure configuration & hardening",
    "Access control & credential management",
    "Vulnerability assessment & continuous monitoring",
  ],
};

/** Cisco Networking Essentials 2.0 — Packet Tracer activities completed and saved (Jun–Jul 2024). */
export type Lab = {
  id: string;
  title: string;
  topic: "Build" | "Services";
  date: string;
};

export const networkingLabs: Lab[] = [
  { id: "3.3.3", title: "Deploy devices", topic: "Build", date: "Jun 2024" },
  { id: "3.3.4", title: "Deploy and cable devices", topic: "Build", date: "Jun 2024" },
  { id: "3.4.3", title: "Configure end devices", topic: "Build", date: "Jun 2024" },
  { id: "3.5.1", title: "Create a simple network", topic: "Build", date: "Jun 2024" },
  { id: "9.2.5", title: "Configure DHCP on a wireless router", topic: "Services", date: "Jul 2024" },
  { id: "12.4.4", title: "Use FTP services", topic: "Services", date: "Jul 2024" },
];

/** Older public repos — shown small, honestly, as earlier web practice. */
export const earlierWork = [
  { name: "CodeCard", href: "https://github.com/josiahddev/CodeCard", note: "Static page, hosted on GitHub Pages" },
  { name: "QuickBiteRepo", href: "https://github.com/josiahddev/QuickBiteRepo", note: "HTML front-end practice — food delivery concept" },
  { name: "webapp", href: "https://github.com/josiahddev/webapp", note: "A first simple web app" },
];

/* ------------------------------------------------------------------ */
/* Learning                                                             */
/* ------------------------------------------------------------------ */

export type StepState = "done" | "current" | "next";

export const learningTracks: {
  name: string;
  why: string;
  steps: { label: string; state: StepState }[];
}[] = [
  {
    name: "Networking",
    why: "A lot of “the computer is broken” tickets turn out to be the network.",
    steps: [
      { label: "TCP/IP", state: "done" },
      { label: "DNS / DHCP", state: "done" },
      { label: "Troubleshooting", state: "current" },
      { label: "Network security", state: "next" },
    ],
  },
  {
    name: "Systems",
    why: "Moving from fixing single machines to managing them properly.",
    steps: [
      { label: "Windows", state: "done" },
      { label: "Linux", state: "current" },
      { label: "Active Directory", state: "current" },
      { label: "Microsoft 365", state: "current" },
      { label: "Entra ID", state: "next" },
    ],
  },
  {
    name: "Security",
    why: "Where I'm headed — built on the two tracks above, not instead of them.",
    steps: [
      { label: "Fundamentals", state: "done" },
      { label: "SIEM", state: "current" },
      { label: "Vulnerability management", state: "current" },
      { label: "Security engineering", state: "next" },
    ],
  },
];

export const stepStateLabel: Record<StepState, string> = {
  done: "Covered",
  current: "Now",
  next: "Next",
};

export type Credential = {
  name: string;
  issuer: string;
  date: string | null;
  /** "badge" = verified digital credential; "course" = training attended; "in-progress" = not finished. */
  type: "badge" | "course" | "in-progress";
  note?: string;
  /** Public verification link (Credly badge page). */
  url?: string;
};

const credly = (id: string) => `https://www.credly.com/badges/${id}`;

export const credentials: Credential[] = [
  // Verified on the public Credly profile, 2026-09-26.
  { name: "Cisco Networking Academy Learn-A-Thon 2026", issuer: "Cisco · Credly", date: "Apr 2026", type: "badge", url: credly("9890b6d6-f884-49be-a85f-867b480637c4") },
  { name: "Network Technician Career Path", issuer: "Cisco · Credly", date: "Feb 2026", type: "badge", url: credly("59195161-6d62-441e-b5d8-7e0c17f36182") },
  { name: "Networking Essentials", issuer: "Cisco · Credly", date: "Sep 2024", type: "badge", url: credly("d290ca76-d862-4f01-9573-34214a7f5902") },
  { name: "Introduction to Cybersecurity", issuer: "Cisco · Credly", date: "May 2024", type: "badge", url: credly("561cc488-06b7-47a9-9857-5a1e7c18c413") },
  // On the resume as a Credly badge but not on the public profile — shown as a course until verified.
  { name: "IT Customer Support", issuer: "Cisco", date: "Feb 2026", type: "course" },
  { name: "Google Cybersecurity Certificate", issuer: "Google", date: null, type: "in-progress" },
  {
    name: "CompTIA Security+ — coursework",
    issuer: "Campus Technologies, NIIT Abuja",
    date: "2025",
    type: "course",
    note: "Training course. Not the CompTIA exam — not certified yet.",
  },
  { name: "Networking Essentials", issuer: "Campus Technologies, NIIT Abuja", date: "2024", type: "course" },
  { name: "Cybersecurity Training", issuer: "", date: "2024", type: "course" },
  { name: "Microsoft Office & Internet Basics", issuer: "", date: "2023", type: "course" },
  { name: "Figma Web & App Design Mastery", issuer: "", date: null, type: "course" },
  { name: "Web Development Bootcamp", issuer: "", date: "2022", type: "course" },
  { name: "Jobberman Soft-Skills Training", issuer: "Jobberman", date: "2022", type: "course" },
  { name: "Introduction to HTML5", issuer: "", date: "2021", type: "course" },
];

export const credentialTypeLabel: Record<Credential["type"], string> = {
  badge: "Badge",
  course: "Course",
  "in-progress": "In progress",
};
