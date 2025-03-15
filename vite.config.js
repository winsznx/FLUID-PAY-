import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    include: ['ethers'], // Ensure ethers is bundled properly
  },
  build: {
    rollupOptions: {
      external: ['ethers'], // Ensures Rollup doesn't fail to resolve it
    },
  },
})
