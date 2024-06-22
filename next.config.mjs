/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:2024/:path*",
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
