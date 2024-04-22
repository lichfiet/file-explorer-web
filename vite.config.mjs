import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react()],
    server: {    
        open: false,
        port: 3001,
        host: [`localhost`, `0.0.0.0`]
    },
})
