import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({
        insertTypesEntry: true,
    })],
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'Yaseer',
            fileName: 'yaseer.utils',
            formats: ['es', 'cjs', 'umd', 'iife']
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
