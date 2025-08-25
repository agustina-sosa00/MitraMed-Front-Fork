// vite.config.ts
import { defineConfig } from "file:///C:/Users/Leandro/Desktop/MitraMed-Front/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///C:/Users/Leandro/Desktop/MitraMed-Front/node_modules/vite-plugin-html/dist/index.mjs";
import react from "file:///C:/Users/Leandro/Desktop/MitraMed-Front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";

// package.json
var package_default = {
  name: "mitra-med",
  private: true,
  version: "1.1.0",
  lastUpdate: "22-01-25",
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc -b && vite build",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
    "type-check": "tsc --noEmit -p tsconfig.app.json"
  },
  dependencies: {
    "@emailjs/browser": "^4.4.1",
    "@emotion/react": "^11.14.0",
    "@headlessui/react": "^2.1.2",
    "@remixicon/react": "^4.6.0",
    "@rollup/plugin-commonjs": "^28.0.2",
    "@rollup/plugin-node-resolve": "^16.0.0",
    "@table-library/react-table-library": "^4.1.15",
    "@tanstack/react-query": "^5.51.15",
    "@tanstack/react-query-devtools": "^5.51.18",
    "@tremor/react": "^3.18.7",
    antd: "^5.26.0",
    axios: "^1.7.2",
    clsx: "^2.1.1",
    "date-fns": "^4.1.0",
    dayjs: "^1.11.13",
    "js-cookie": "^3.0.5",
    "pdfjs-dist": "^5.3.31",
    react: "^18.3.1",
    "react-datepicker": "^7.5.0",
    "react-dom": "^18.3.1",
    "react-dropzone": "^14.3.8",
    "react-google-recaptcha": "^3.1.0",
    "react-hook-form": "^7.52.1",
    "react-icons": "^5.5.0",
    "react-number-format": "^5.4.4",
    "react-pdf": "^10.0.1",
    "react-router-dom": "^6.25.1",
    "react-select": "^5.8.3",
    "react-slick": "^0.30.2",
    "react-spinners": "^0.14.1",
    "react-toastify": "^10.0.5",
    recharts: "^3.1.1",
    rollup: "^4.29.1",
    "slick-carousel": "^1.8.1",
    sweetalert2: "^11.22.0",
    zod: "^3.23.8"
  },
  devDependencies: {
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/react-slick": "^0.23.13",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitejs/plugin-react-swc": "^3.5.0",
    autoprefixer: "^10.4.19",
    esbuild: "^0.24.2",
    eslint: "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    postcss: "^8.4.39",
    tailwindcss: "^3.4.6",
    typescript: "^5.2.2",
    vite: "^5.3.4",
    "vite-plugin-html": "^3.2.2",
    "vite-tsconfig-paths": "^5.1.0"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\Leandro\\Desktop\\MitraMed-Front";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: `MitraMed  V${package_default.version}`
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@/components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@/layouts": path.resolve(__vite_injected_original_dirname, "src/layouts"),
      "@/lib": path.resolve(__vite_injected_original_dirname, "src/lib"),
      "@/services": path.resolve(__vite_injected_original_dirname, "src/services"),
      "@/types": path.resolve(__vite_injected_original_dirname, "src/types"),
      "@/utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@/views": path.resolve(__vite_injected_original_dirname, "src/views"),
      // Agregado para frontend-resourses:
      "@/frontend-resourses": path.resolve(__vite_injected_original_dirname, "src/frontend-resourses"),
      // Si usás import con mayúscula (recomendado cambiarlo), podés agregar también:
      "@/components-frontend-resources": path.resolve(
        __vite_injected_original_dirname,
        "src/frontend-resourses/components"
      )
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTGVhbmRyb1xcXFxEZXNrdG9wXFxcXE1pdHJhTWVkLUZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMZWFuZHJvXFxcXERlc2t0b3BcXFxcTWl0cmFNZWQtRnJvbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlYW5kcm8vRGVza3RvcC9NaXRyYU1lZC1Gcm9udC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBwYWNrYWdlSW5mbyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogYE1pdHJhTWVkICBWJHtwYWNrYWdlSW5mby52ZXJzaW9ufWAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAL2NvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29tcG9uZW50c1wiKSxcclxuICAgICAgXCJAL2xheW91dHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvbGF5b3V0c1wiKSxcclxuICAgICAgXCJAL2xpYlwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9saWJcIiksXHJcbiAgICAgIFwiQC9zZXJ2aWNlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9zZXJ2aWNlc1wiKSxcclxuICAgICAgXCJAL3R5cGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3R5cGVzXCIpLFxyXG4gICAgICBcIkAvdXRpbHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdXRpbHNcIiksXHJcbiAgICAgIFwiQC92aWV3c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy92aWV3c1wiKSxcclxuICAgICAgLy8gQWdyZWdhZG8gcGFyYSBmcm9udGVuZC1yZXNvdXJzZXM6XHJcbiAgICAgIFwiQC9mcm9udGVuZC1yZXNvdXJzZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvZnJvbnRlbmQtcmVzb3Vyc2VzXCIpLFxyXG4gICAgICAvLyBTaSB1c1x1MDBFMXMgaW1wb3J0IGNvbiBtYXlcdTAwRkFzY3VsYSAocmVjb21lbmRhZG8gY2FtYmlhcmxvKSwgcG9kXHUwMEU5cyBhZ3JlZ2FyIHRhbWJpXHUwMEU5bjpcclxuICAgICAgXCJAL2NvbXBvbmVudHMtZnJvbnRlbmQtcmVzb3VyY2VzXCI6IHBhdGgucmVzb2x2ZShcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgXCJzcmMvZnJvbnRlbmQtcmVzb3Vyc2VzL2NvbXBvbmVudHNcIlxyXG4gICAgICApLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJtaXRyYS1tZWRcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcInZlcnNpb25cIjogXCIxLjEuMFwiLFxyXG4gIFwibGFzdFVwZGF0ZVwiOiBcIjIyLTAxLTI1XCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxyXG4gICAgXCJidWlsZFwiOiBcInRzYyAtYiAmJiB2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwidHlwZS1jaGVja1wiOiBcInRzYyAtLW5vRW1pdCAtcCB0c2NvbmZpZy5hcHAuanNvblwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBlbWFpbGpzL2Jyb3dzZXJcIjogXCJeNC40LjFcIixcclxuICAgIFwiQGVtb3Rpb24vcmVhY3RcIjogXCJeMTEuMTQuMFwiLFxyXG4gICAgXCJAaGVhZGxlc3N1aS9yZWFjdFwiOiBcIl4yLjEuMlwiLFxyXG4gICAgXCJAcmVtaXhpY29uL3JlYWN0XCI6IFwiXjQuNi4wXCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLWNvbW1vbmpzXCI6IFwiXjI4LjAuMlwiLFxyXG4gICAgXCJAcm9sbHVwL3BsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMTYuMC4wXCIsXHJcbiAgICBcIkB0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnlcIjogXCJeNC4xLjE1XCIsXHJcbiAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiOiBcIl41LjUxLjE1XCIsXHJcbiAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeS1kZXZ0b29sc1wiOiBcIl41LjUxLjE4XCIsXHJcbiAgICBcIkB0cmVtb3IvcmVhY3RcIjogXCJeMy4xOC43XCIsXHJcbiAgICBcImFudGRcIjogXCJeNS4yNi4wXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNy4yXCIsXHJcbiAgICBcImNsc3hcIjogXCJeMi4xLjFcIixcclxuICAgIFwiZGF0ZS1mbnNcIjogXCJeNC4xLjBcIixcclxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xM1wiLFxyXG4gICAgXCJqcy1jb29raWVcIjogXCJeMy4wLjVcIixcclxuICAgIFwicGRmanMtZGlzdFwiOiBcIl41LjMuMzFcIixcclxuICAgIFwicmVhY3RcIjogXCJeMTguMy4xXCIsXHJcbiAgICBcInJlYWN0LWRhdGVwaWNrZXJcIjogXCJeNy41LjBcIixcclxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJyZWFjdC1kcm9wem9uZVwiOiBcIl4xNC4zLjhcIixcclxuICAgIFwicmVhY3QtZ29vZ2xlLXJlY2FwdGNoYVwiOiBcIl4zLjEuMFwiLFxyXG4gICAgXCJyZWFjdC1ob29rLWZvcm1cIjogXCJeNy41Mi4xXCIsXHJcbiAgICBcInJlYWN0LWljb25zXCI6IFwiXjUuNS4wXCIsXHJcbiAgICBcInJlYWN0LW51bWJlci1mb3JtYXRcIjogXCJeNS40LjRcIixcclxuICAgIFwicmVhY3QtcGRmXCI6IFwiXjEwLjAuMVwiLFxyXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjYuMjUuMVwiLFxyXG4gICAgXCJyZWFjdC1zZWxlY3RcIjogXCJeNS44LjNcIixcclxuICAgIFwicmVhY3Qtc2xpY2tcIjogXCJeMC4zMC4yXCIsXHJcbiAgICBcInJlYWN0LXNwaW5uZXJzXCI6IFwiXjAuMTQuMVwiLFxyXG4gICAgXCJyZWFjdC10b2FzdGlmeVwiOiBcIl4xMC4wLjVcIixcclxuICAgIFwicmVjaGFydHNcIjogXCJeMy4xLjFcIixcclxuICAgIFwicm9sbHVwXCI6IFwiXjQuMjkuMVwiLFxyXG4gICAgXCJzbGljay1jYXJvdXNlbFwiOiBcIl4xLjguMVwiLFxyXG4gICAgXCJzd2VldGFsZXJ0MlwiOiBcIl4xMS4yMi4wXCIsXHJcbiAgICBcInpvZFwiOiBcIl4zLjIzLjhcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAdHlwZXMvanMtY29va2llXCI6IFwiXjMuMC42XCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjEwLjJcIixcclxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjMuM1wiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjMuMFwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3Qtc2xpY2tcIjogXCJeMC4yMy4xM1wiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjE1LjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl43LjE1LjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4zLjRcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuNS4wXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXHJcbiAgICBcImVzYnVpbGRcIjogXCJeMC4yNC4yXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMlwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjdcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzlcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjZcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy40XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWh0bWxcIjogXCJeMy4yLjJcIixcclxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl41LjEuMFwiXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsU0FBUyxvQkFBb0I7QUFDOVUsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTs7O0FDSGpCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxZQUFjO0FBQUEsRUFDZCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixTQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCxvQkFBb0I7QUFBQSxJQUNwQixrQkFBa0I7QUFBQSxJQUNsQixxQkFBcUI7QUFBQSxJQUNyQixvQkFBb0I7QUFBQSxJQUNwQiwyQkFBMkI7QUFBQSxJQUMzQiwrQkFBK0I7QUFBQSxJQUMvQixzQ0FBc0M7QUFBQSxJQUN0Qyx5QkFBeUI7QUFBQSxJQUN6QixrQ0FBa0M7QUFBQSxJQUNsQyxpQkFBaUI7QUFBQSxJQUNqQixNQUFRO0FBQUEsSUFDUixPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFDZCxPQUFTO0FBQUEsSUFDVCxvQkFBb0I7QUFBQSxJQUNwQixhQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQiwwQkFBMEI7QUFBQSxJQUMxQixtQkFBbUI7QUFBQSxJQUNuQixlQUFlO0FBQUEsSUFDZix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixvQkFBb0I7QUFBQSxJQUNwQixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixrQkFBa0I7QUFBQSxJQUNsQixrQkFBa0I7QUFBQSxJQUNsQixVQUFZO0FBQUEsSUFDWixRQUFVO0FBQUEsSUFDVixrQkFBa0I7QUFBQSxJQUNsQixhQUFlO0FBQUEsSUFDZixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0Isd0JBQXdCO0FBQUEsSUFDeEIsNEJBQTRCO0FBQUEsSUFDNUIsY0FBZ0I7QUFBQSxJQUNoQixTQUFXO0FBQUEsSUFDWCxRQUFVO0FBQUEsSUFDViw2QkFBNkI7QUFBQSxJQUM3QiwrQkFBK0I7QUFBQSxJQUMvQixTQUFXO0FBQUEsSUFDWCxhQUFlO0FBQUEsSUFDZixZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxJQUNwQix1QkFBdUI7QUFBQSxFQUN6QjtBQUNGOzs7QUR6RUEsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04saUJBQWlCO0FBQUEsTUFDZixRQUFRO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixPQUFPLGNBQWMsZ0JBQVksT0FBTztBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLGdCQUFnQixLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDeEQsYUFBYSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2xELFNBQVMsS0FBSyxRQUFRLGtDQUFXLFNBQVM7QUFBQSxNQUMxQyxjQUFjLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDcEQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzlDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM5QyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUE7QUFBQSxNQUU5Qyx3QkFBd0IsS0FBSyxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBO0FBQUEsTUFFeEUsbUNBQW1DLEtBQUs7QUFBQSxRQUN0QztBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
