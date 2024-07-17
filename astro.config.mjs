import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://downloads.cloudcraftmc.de",
  output: "static",
  compressHTML: process.env.NODE_ENV === "production",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("404"),
      changefreq: "weekly",
      lastmod: new Date(),
    }),
    purgecss({
      fontFace: true,
      keyframes: true,
    }),
    preact({
      devtools: process.env.NODE_ENV !== "production",
    }),
  ],
});
