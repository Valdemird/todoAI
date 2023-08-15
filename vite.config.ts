/// <reference types="vitest"/>
/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    environment:"jsdom",
    globals:true
  }
   
})
