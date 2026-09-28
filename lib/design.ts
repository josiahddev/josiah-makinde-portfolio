/**
 * UI/UX case studies, designed in Figma. Copy is taken from Josiah's own
 * case-study boards; images live in /public/design/<slug>/.
 */

export type DesignSlide = { file: string; w: number; h: number; caption: string };

export type DesignProject = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  role: string;
  type: string;
  tools: string;
  year: string;
  challenge: string;
  approach: string;
  outcome: string;
  decisions: { title: string; detail: string }[];
  slides: DesignSlide[];
};

const s = (file: string, w: number, h: number, caption: string): DesignSlide => ({ file, w, h, caption });

export const designProjects: DesignProject[] = [
  {
    slug: "joxich-hotel",
    title: "Joxich Hotel",
    category: "Hotel booking website",
    tagline: "Plan. Book. Travel. From “where to?” to “reserved” in four screens.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Concept",
    tools: "Figma",
    year: "2024",
    challenge:
      "Booking a hotel online often means juggling cluttered listings, hidden fees and endless tabs. The goal was a booking flow that feels calm and trustworthy — search, compare and reserve without surprises.",
    approach:
      "Started with low-fidelity wireframes to map the core journey — search, results, hotel details and sign-in — then built a reusable component library (navbar, date picker, location menu, hotel cards, FAQ accordion) before moving to high-fidelity screens.",
    outcome:
      "A four-page, responsive-ready desktop flow with transparent pricing (nightly rate, taxes and total before you reserve), ratings and reviews at a glance, and similar-property suggestions.",
    decisions: [
      { title: "Search first", detail: "Location and date search sit on the hero, so the first action is the most important one." },
      { title: "Honest pricing", detail: "Nightly price, discount, taxes and final total broken down before reservation." },
      { title: "Social proof", detail: "Rating summary with distribution bars and recent reviews build trust fast." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-wireframes.webp", 1600, 1113, "Low-fidelity wireframes"),
      s("04-style-guide.webp", 1600, 1079, "Style guide"),
      s("05-homepage.webp", 1600, 3091, "Homepage"),
      s("06-search-results.webp", 1600, 2139, "Search results"),
      s("07-hotel-details-booking.webp", 1600, 3809, "Hotel details & booking"),
      s("08-login-sign-up.webp", 1600, 1335, "Login & sign-up"),
      s("09-details.webp", 1600, 1493, "Details"),
    ],
  },
  {
    slug: "cryptomoney",
    title: "CryptoMoney",
    category: "Crypto investing landing page",
    tagline: "One place to invest in crypto and manage your money — designed to make crypto feel approachable.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Concept",
    tools: "Figma",
    year: "2024",
    challenge:
      "Crypto products tend to feel intimidating — dense charts, jargon, dark aggressive visuals. CryptoMoney needed to earn the trust of first-time investors while still feeling modern.",
    approach:
      "A soft, muted lavender palette, friendly illustrations and short plain-language copy. Each benefit (invest, plan, manage) gets its own illustrated block, followed by three-step onboarding and app download calls to action.",
    outcome:
      "A calm landing page with a signature card system — gradient debit cards that make the product tangible — plus a clear “how to get started” path and a news section.",
    decisions: [
      { title: "Tangible product", detail: "Gradient card designs show users what they actually get." },
      { title: "3-step onboarding", detail: "Create account → verify → start investing, explained up front." },
      { title: "Plain language", detail: "Short, benefit-led copy instead of trading jargon." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-style-guide.webp", 1600, 1098, "Style guide"),
      s("04-hero.webp", 1600, 1229, "Hero"),
      s("05-card-system.webp", 1600, 1287, "Card system"),
      s("06-why-cryptomoney.webp", 1600, 2026, "Why CryptoMoney"),
      s("07-onboarding-news-download.webp", 1600, 2490, "Onboarding, news & download"),
    ],
  },
  {
    slug: "joxichclass",
    title: "JoxichClass",
    category: "Edtech website — hobby classes for kids",
    tagline: "Live hobby classes for kids, taught by creative mentors.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Concept",
    tools: "Figma",
    year: "2024",
    challenge:
      "Parents want creative, trustworthy extracurricular learning for their kids — but hobby classes online are scattered and hard to compare. The site had to reassure parents while showing the fun of the classes.",
    approach:
      "A clean navy-and-white system for credibility, paired with colourful hands-on class photography for energy. Classes and mentors are browsable in carousels with quick filters (All, Most Popular, Trending, Just Added).",
    outcome:
      "A friendly landing page that moves parents from discovery to sign-up: email capture in the hero, class and mentor carousels, and a clear “why learn with us” section.",
    decisions: [
      { title: "Email-first hero", detail: "Sign-up is available from the very first screen." },
      { title: "Filterable carousels", detail: "Classes and mentors browsable by popularity or recency." },
      { title: "Mentor credibility", detail: "Real faces and specialisms build parent trust." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-style-guide.webp", 1600, 1094, "Style guide"),
      s("04-full-landing-page.webp", 1600, 3905, "Full landing page"),
      s("05-live-classes.webp", 1600, 1229, "Live classes"),
      s("06-top-mentors.webp", 1600, 1229, "Top mentors"),
    ],
  },
  {
    slug: "discover-mountain",
    title: "Discover Mountain",
    category: "Travel agency website",
    tagline: "Explore the world — a travel site built around inspiration, activities and destinations.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Concept",
    tools: "Figma",
    year: "2024",
    challenge:
      "Travel sites often lead with forms and prices. Discover Mountain needed to inspire first — make visitors want to go somewhere — and then make it easy to find the right trip.",
    approach:
      "Full-bleed landscape photography and a deep teal palette for a calm, adventurous mood. A search bar on the hero, then an interactive activities list, a quote, testimonials and a masonry gallery of destinations.",
    outcome:
      "An immersive single-page experience that balances inspiration and action, closing with a newsletter sign-up.",
    decisions: [
      { title: "Search on the hero", detail: "Destinations and things to do are one search away." },
      { title: "Activity explorer", detail: "Walking, cycling, trekking, rafting and yoga — each with its own preview." },
      { title: "Destination gallery", detail: "A masonry grid that sells the dream visually." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-style-guide.webp", 1600, 1078, "Style guide"),
      s("04-full-landing-page.webp", 1600, 5169, "Full landing page"),
      s("05-activities-we-offer.webp", 1600, 1335, "Activities"),
      s("06-luxury-destinations.webp", 1600, 2000, "Destinations"),
    ],
  },
  {
    slug: "proyoga-buddy",
    title: "ProYoga Buddy",
    category: "Yoga classes website",
    tagline: "Ancient yoga practices, made easy to start.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Concept",
    tools: "Figma",
    year: "2024",
    challenge:
      "Beginners often feel yoga isn't “for them”. ProYoga Buddy needed to feel calm and welcoming, explain its value quickly, and make choosing a membership simple.",
    approach:
      "A serif/sans pairing (Lora + Raleway) and a soft periwinkle accent for a calm, editorial tone. Three pages — Home, Courses and About — built from a shared component set: buttons, email input and membership cards.",
    outcome:
      "A serene three-page site with a clear path to joining: moody hero imagery, benefit tiles, straightforward pricing and a newsletter capture on every page.",
    decisions: [
      { title: "Calm visual tone", detail: "Serif headings and muted imagery set a mindful mood." },
      { title: "Simple pricing", detail: "Two plans, three benefits each — easy to compare." },
      { title: "Consistent system", detail: "Shared components across Home, Courses and About." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-style-guide.webp", 1600, 1445, "Style guide"),
      s("04-homepage.webp", 1600, 3306, "Homepage"),
      s("05-courses-about.webp", 1600, 1223, "Courses & About"),
      s("06-membership-plans.webp", 1600, 1229, "Membership plans"),
    ],
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Designer portfolio website",
    tagline: "A minimal, monochrome portfolio that lets the work do the talking.",
    role: "UI/UX Designer (solo)",
    type: "Web design · Personal",
    tools: "Figma",
    year: "2024",
    challenge:
      "A designer's portfolio has one job: get the work seen and make it easy to get in touch. Anything decorative competes with the projects.",
    approach:
      "A monochrome palette and Work Sans keep the frame neutral. Four sections — About, Work, Blog and Contact — each fit in a single screen, with vertical section labels for quick orientation.",
    outcome:
      "A focused one-page portfolio with project cards (tags and live links), a blog, a downloadable CV and a simple contact form.",
    decisions: [
      { title: "Neutral frame", detail: "Greys only, so project visuals stand out." },
      { title: "One screen per section", detail: "About, Work, Blog, Contact — no scroll fatigue." },
      { title: "Clear actions", detail: "Download CV, view live projects, send a message." },
    ],
    slides: [
      s("01-intro.webp", 1600, 1321, "Intro"),
      s("03-style-guide.webp", 1600, 1077, "Style guide"),
      s("04-four-sections.webp", 1600, 1342, "Four sections"),
      s("05-work.webp", 1600, 1229, "Work"),
    ],
  },
];
