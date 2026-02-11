import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // Genera rutas relativas para que funcione en cualquier subcarpeta
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reservarCita: resolve(__dirname, 'reservarCita.html'),
      },
    },
  },
})
