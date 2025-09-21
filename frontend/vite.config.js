import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'tensorflow': ['@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl'],
          'face-api': ['face-api.js'],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils': ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
