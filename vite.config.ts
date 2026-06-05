import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import content from './src/data/content.json';

const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const contentHtml = (): Plugin => ({
  name: 'portfolio-content-html',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      const { site } = content;
      const tokens: Record<string, string> = {
        SITE_TITLE: site.title,
        SITE_DESCRIPTION: site.description,
        SITE_SHORT_DESCRIPTION: site.shortDescription,
        SITE_TWITTER_DESCRIPTION: site.twitterDescription,
        SITE_KEYWORDS: site.keywords,
        SITE_AUTHOR: site.author,
        SITE_OG_TITLE: site.ogTitle,
        SITE_TWITTER_TITLE: site.twitterTitle,
        SITE_URL: site.url,
      };
      let out = html;
      for (const [key, value] of Object.entries(tokens)) {
        out = out.replaceAll(`%${key}%`, escape(value));
      }
      return out;
    },
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contentHtml()],
});
