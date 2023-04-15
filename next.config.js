/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPlugins([withNextra, withPWA], {
  images: {
    unoptimized: true,
  },
});
