/**
 * Demo build for the portfolio.
 *
 * Produces ../pengus-demo — a static copy of the app that works both when
 * hosted and when opened straight from disk (file://), like Lab Escape.
 * The regular dev/build setup in vite.config.ts is untouched.
 *
 *   npm run build:demo
 */
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Photo paths are absolute ("/photos/x.png") in the source. Make them relative
// so the demo works from a subfolder, and point them at the optimized WebP copies.
const relativePhotos = (): Plugin => ({
  name: 'pengus-demo-relative-photos',
  enforce: 'pre',
  transform(code, id) {
    if (!id.replace(/\\/g, '/').endsWith('/src/data/destinations.ts')) return null;
    return code.replace(/(['"`])\/photos\/([^'"`]+?)\.png\1/g, '$1./photos/$2.webp$1');
  },
});

// Browsers refuse to load type="module" scripts from file://. The bundle is a
// single IIFE, so a classic deferred script is enough.
const classicScript = (): Plugin => ({
  name: 'pengus-demo-classic-script',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace(/<script type="module" crossorigin src=/g, '<script defer src=')
      .replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href=');
  },
});

export default defineConfig({
  base: './',
  plugins: [react(), relativePhotos(), classicScript()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../pengus-demo',
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
