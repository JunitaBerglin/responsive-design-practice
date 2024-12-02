import {defineConfig} from 'vite';

export default defineConfig({
base: 'responsive-design-practice',
server: {
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://localhost:5052',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
}});