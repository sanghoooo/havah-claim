import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
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
