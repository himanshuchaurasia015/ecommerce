import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      "/api/": "https://ecommerce-qpsf.onrender.com",
      "/uploads/": "https://ecommerce-qpsf.onrender.com",
    },
  }
  
})
