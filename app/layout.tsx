import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/MotionProvider";
import { contact, site } from "@/lib/data";
import "./globals.css";

const body = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
  display: "swap",
});
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: contact.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0f0e",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: "ICT Manager",
  worksFor: { "@type": "Organization", name: "Chris Makinde & Co Chartered Accountants" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mountain Top University" },
  address: { "@type": "PostalAddress", addressLocality: "Kaduna", addressCountry: "NG" },
  url: site.url,
  image: `${site.url}/josiah.webp`,
  sameAs: [contact.linkedin, contact.github, contact.credly],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${serif.variable} ${code.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-[3px] bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          // Static, author-controlled data — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
