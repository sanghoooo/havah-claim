import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/email-valid": { target: "https://dev-openapi.havah.io", changeOrigin: true },
		},
	},
	build: {
		minify: true,
		target: "es2020",
	},
	esbuild: {
		target: "es2020",
	},
	optimizeDeps: {
		esbuildOptions: {
			target: "es2020",
		},
	},
});
