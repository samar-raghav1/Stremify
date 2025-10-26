import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";

dotenv.config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base:'./',
  server:{
    proxy:{
      '/api':{
        target:process.env.VITE_BASE_URL,
        changeOrigin:true,
        secure:true
      }
    }
  }
})
