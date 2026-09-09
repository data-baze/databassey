import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { mediumHandler } from './server/medium.mjs';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'MEDIUM_');
  if (env.MEDIUM_USERNAME) process.env.MEDIUM_USERNAME = env.MEDIUM_USERNAME;
  return {
  plugins: [react(), tailwindcss(), {
    name: 'local-medium-feed',
    configureServer(server) {
      server.middlewares.use('/api/medium', (req, res) => { void mediumHandler(req, res); });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/medium', (req, res) => { void mediumHandler(req, res); });
    },
  }],
  };
});
