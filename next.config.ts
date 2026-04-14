import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.ngrok-free.app',"https://atdc-frontend.vercel.app","https://atdc.vercel.app"],
};

export default nextConfig;
