import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Optimize output
    target: 'ES2020',
    minify: 'esbuild', // Use esbuild (faster than terser, built-in)
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor code from app code for better cache invalidation
          'vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', '@tanstack/react-table'],
        },
      },
    },
    
    // Performance hints
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    
    // Output settings
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // esbuild options for console removal
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', '@tanstack/react-table'],
  },
  
  // Server config for development
  server: {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  },
})