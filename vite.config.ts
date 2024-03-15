import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({
        insertTypesEntry: true,
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'index.ts'),
            name: 'yaseer',
            fileName: 'yaseer.utils',
            formats: ['es', 'cjs', 'umd', 'iife']
        },
        rollupOptions: {
            // input: [
            //     resolve(__dirname, 'src', 'handlers', 'ddom.ts'),
            //     resolve(__dirname, 'src', 'handlers', 'nest.ts'),
            //     resolve(__dirname, 'src', 'handlers', 'reactivity.ts'),
            // ],
            external: [],
            output: {
                globals: {}
            }
        },
        outDir: 'y'
    }
});
