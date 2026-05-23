import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/7-day-program.html", destination: "/programs/7-day", permanent: true },
      { source: "/weekend-program.html", destination: "/programs/weekend", permanent: true },
      { source: "/stay-with-us.html", destination: "/programs/stay-with-us", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/vision-and-history.html", destination: "/about/founder", permanent: true },
      { source: "/our-sacred-place.html", destination: "/about/sacred-place", permanent: true },
      { source: "/what-we-offer.html", destination: "/programs", permanent: true },
      { source: "/guidelines-and-rules.html", destination: "/faq", permanent: true },
      { source: "/shanti-dhama.html", destination: "/impact", permanent: true },
      { source: "/karunashraya.html", destination: "/impact", permanent: true },
    ];
  },
};

export default nextConfig;
