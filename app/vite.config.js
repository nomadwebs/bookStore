import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida del build
    assetsDir: 'assets', // Carpeta para los archivos estáticos
  },
})