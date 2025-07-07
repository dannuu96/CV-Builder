import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // PWA plugin will be added after installing dependencies
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          pdf: ['@react-pdf/renderer'],
          ui: ['framer-motion', 'react-icons']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
});
