/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mma-affiliate.s3.ap-southeast-1.amazonaws.com']
  },
  env: {
    // Next-Auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN
  }
};

module.exports = nextConfig;
