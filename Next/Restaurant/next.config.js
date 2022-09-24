/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;

module.exports = () => {
  const rewrites = () => {
    return [
      // {
      //   source: "/hello",
      //   destination: "http://localhost:3000/api/hello",
      // },
      // {
      //   source: "/app/:path*",
      //   destination: "http://localhost:3000/:path*", // Proxy to Backend
      // },
    ];
  };
  return {
    rewrites,
  };
};
