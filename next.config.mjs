/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/sign-in",
        destination: "https://premily-premily-d67f7a97.koyeb.app/sign-in",
      },
    ];
  },
};

export default nextConfig;
