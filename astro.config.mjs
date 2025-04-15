// @ts-check
import {defineConfig} from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    // Replace this with your domain
    // Make sure you change the URL in the /public/robots.txt file as well!
    site: "https://astro-advanced.sampacker.com",
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [sitemap()],
});