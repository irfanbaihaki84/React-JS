import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        hello_world: 'hello-world.html',
        contact: 'contact.html',
        task_list: 'task-list.html',
      },
    },
  },
});
