import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    base: '/goit-js-hw-11/', // Repository adın doğru olmalı 
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'), // HTML dosyalarını otomatik bulur
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist', // Projenin derleneceği klasör
      emptyOutDir: true, // Eski derlemeleri temizler
    },
    plugins: [
      injectHTML(), // HTML'e otomatik olarak script etiketlerini ekler
      FullReload(['./src/**/**.html']), // HTML dosyalarında yapılan değişikliklerle sayfa yeniden yüklenir
      SortCss({
        sort: 'mobile-first', // CSS'i mobil öncelikli olarak sıralar
      }),
    ],
    optimizeDeps: {
      include: ['izitoast', 'simplelightbox'], // Gerekli bağımlılıkları buraya ekle
    },
  };
});
