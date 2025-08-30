import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambia 'buscyl' por el nombre de tu repositorio de Github
const repoName = 'buscyl-busqueda';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
