import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString();

export default defineConfig({
  server: {
    open: true
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [react(), pluginRewriteAll()]
})