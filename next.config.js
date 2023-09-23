/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Next-Auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN
  }
};

module.exports = nextConfig;
