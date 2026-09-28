# Josiah Makinde — Portfolio

**Live site:** [josiah-makinde-portfolio.vercel.app](https://josiah-makinde-portfolio.vercel.app)

Personal portfolio for an IT support and ICT professional in Kaduna, Nigeria, working toward cybersecurity. It covers hands-on IT experience, networking labs, a group vulnerability assessment, small PowerShell tools, UI/UX case studies and the certificates behind them.

## What's on the site

- **Experience** — IT support roles from 2021 to today, as a timeline
- **Projects** — a lab-based vulnerability assessment (Kioptrix and Metasploitable 2), a Windows system health checker in PowerShell, and a log of Cisco Packet Tracer labs
- **Design** — six UI/UX case studies designed in Figma
- **Learning** — current focus across networking, systems and security, plus Cisco badges verifiable on Credly
- **Contact** — email, LinkedIn, GitHub and a downloadable CV

Everything shown is real. Where something is still in progress it says so, and anything not yet available shows "coming soon" rather than filler.

## Built with

- [Next.js](https://nextjs.org) (App Router) and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for restrained animations, with `prefers-reduced-motion` respected
- Deployed on [Vercel](https://vercel.com), with Web Analytics and Speed Insights

It's built mobile-first, keyboard-accessible and SEO-ready (metadata, Open Graph image, structured data, sitemap).

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

The content lives in two files, so updating the site rarely means touching components:

- `lib/data.ts` — profile, experience, skills, projects, labs, certificates and contact links
- `lib/design.ts` — the UI/UX case studies (images live in `public/design/`)

Every push to `master` redeploys the live site automatically.

## Contact

- GitHub: [@josiahddev](https://github.com/josiahddev)
- LinkedIn: [josiah-makinde](https://www.linkedin.com/in/josiah-makinde-2a55011b7)
- Badges: [Credly](https://www.credly.com/users/ifeoluwa-makinde.c08160c9)
