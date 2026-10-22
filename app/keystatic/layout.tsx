import type { Metadata } from "next";
import { siteUrl } from "@/lib/content";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Site admin",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
