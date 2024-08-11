import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.1.4.3', 
    port: 5173,
  },
})
