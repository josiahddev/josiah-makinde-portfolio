import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project screenshots are served straight from the public GitHub repos.
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/josiahddev/**" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
