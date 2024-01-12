import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { extname, relative, resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import specifier from 'vite-plugin-specifier'

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['src'], exclude: 'src/**/*.stories.tsx' }),
    specifier({
      extMap: {
        '.js': '.mjs'
      },
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', { ignore: 'src/**/*.stories.tsx' })
          .map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    copyPublicDir: false
  },
});
