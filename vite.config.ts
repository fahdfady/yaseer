import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'Yaseer',
            fileName: 'yaseer.utils'
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        },
        outDir: 'y'
    }
});
