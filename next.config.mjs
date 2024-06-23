/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://premily-premily-d67f7a97.koyeb.app/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/SignIn',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
