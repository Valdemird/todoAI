/// <reference types="vitest"/>
/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  test:{
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['lcov', 'json', 'text-summary'],
    },
    environment:"jsdom",
    globals:true
  },
  server: {
    host: true,
    port: 8000,
     watch: {
       usePolling: true
     }
  }
   
})

