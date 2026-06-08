import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://arryz.dev",
  compressHTML: true,
  trailingSlash: "never",
  integrations: [sitemap(), react()],
  vite: {
    plugins: [
      tailwindcss(),
      // Astro's image Vite plugin transforms image imports in .tsx files
      // to return ImageMetadata objects ({src, width, height, format})
      // instead of URL strings. React components expect URL strings for
      // <img src={imported} />. Adding ?url bypasses Astro's transform
      // and tells Vite to return the raw public URL string.
      {
        name: "fix-react-image-imports",
        enforce: "pre",
        transform(code, id) {
          if (!/\.[jt]sx?$/.test(id)) return null;
          if (id.includes("node_modules")) return null;

          const result = code.replace(
            /(from\s+['"])([^'"]+\.(png|jpe?g|gif|svg|webp|avif|ico))(['"])/gi,
            "$1$2?url$4"
          );

          if (result !== code) {
            return { code: result, map: null };
          }
          return null;
        },
      },
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
