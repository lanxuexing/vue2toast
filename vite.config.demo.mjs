import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    root: 'demo',
    base: './', // Use relative paths for flexibility (e.g. GitHub Pages)
    build: {
        outDir: '../docs', // Output to docs/ folder in project root
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'vue': 'vue/dist/vue.esm-bundler.js',
            '@lanxuexing/vue2toast': resolve(__dirname, 'src/index.ts')
        }
    }
})
