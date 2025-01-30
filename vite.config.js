import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    allowedHosts: [
      
      '2f8d-154-72-153-231.ngrok-free.app'
    ]
  }
})
