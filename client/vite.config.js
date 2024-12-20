import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(mp4|webm|ogg|avi|mov|wmv)$/i.test(assetInfo.names)) {
            return 'videos/[name][extname]'; // Keep original file name and extension in the "videos" folder
          }
          return 'assets/[name][extname]'; // Default for other assets
        },
      },
    },
  },
});
