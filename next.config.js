/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Tell Next.js to look in the src directory
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Set the source directory
  distDir: '.next'
};

export default config;
