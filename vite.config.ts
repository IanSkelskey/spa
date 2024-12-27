import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Spa Dashboard',
        short_name: 'Spa',
        description: 'A dashboard application for Spa management.',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/logo-192.webp',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/logo-512.webp',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
