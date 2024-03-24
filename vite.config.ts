import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  server: {
    port: 8000,
    open: true,
  },
});
