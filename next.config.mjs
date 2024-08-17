/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "supabase.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "vmkcluhxpsdrhxlueyvl.supabase.co" },
    ],
  },
};

export default nextConfig;
