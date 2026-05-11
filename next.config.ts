import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.124"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/Motrenko/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.124",
        port: "",
        pathname: "/Motrenko/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.ngrok-free.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ngrok-free.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
