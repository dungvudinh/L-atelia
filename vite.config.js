import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    ViteImageOptimizer({
      // Cấu hình optimize
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true, 
    assetsInlineLimit:4096, 
    rollupOptions:{
      output:{
        manualChunks:{
          vendor:['react', 'react-dom']
        }, 
        assetFileNames:(accessInfo)=>{
          if (/png|jpe?g|svg|gif|webp/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
   preview: {
    port: 4173,
    // host: true
  }
})
