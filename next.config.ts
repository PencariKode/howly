import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "i.imgur.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
