/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.w3schools.com",
      "i.pinimg.com",
      "res.cloudinary.com",
      "randomuser.me",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.w3schools.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
