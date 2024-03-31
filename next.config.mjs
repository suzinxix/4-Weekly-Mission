/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codeit-images.codeit.com",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
      },
      {
        protocol: "https",
        hostname: "s.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "i1.daumcdn.net",
      },
      {
        protocol: "https",
        hostname: "website-prisma.vercel.app",
      },
      {
        protocol: "https",
        hostname: "testing-library.com",
      },
      {
        protocol: "https",
        hostname: "storybook.js.org",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "legacy.reactjs.org",
      },
      {
        protocol: "https",
        hostname: "codeit.kr",
      },
      {
        protocol: "https",
        hostname: "t1.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;
