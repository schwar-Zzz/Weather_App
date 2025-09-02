import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      // Optional: customize host, port, protocol, etc.
      // host: 'localhost',
      // port: 3000,
    }
  }
})
