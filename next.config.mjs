/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://experimental-biddie-premily-6e515ebf.koyeb.app/:path*",
        // destination: "http://localhost:2024/:path*",
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
  reactStrictMode: false,
};

export default nextConfig;
