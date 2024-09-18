export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://almasetu-ye1z.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, '')
      },
    },
  },
  plugins: [react()],
});
