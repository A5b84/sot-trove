import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    base: '', // Not using "/" to allow deployments on a subpath, e.g. on GitHub Pages
    plugins: [react()],
});
