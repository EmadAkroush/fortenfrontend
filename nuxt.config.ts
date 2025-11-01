import * as path from "path";
// Wrong

export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module"],
  css: [
    "@/assets/styles/tailwind.css",
    "@/assets/styles/base.css",
    "@mdi/font/css/materialdesignicons.min.css",
    'primevue/resources/primevue.min.css',
    'primevue/resources/themes/saga-blue/theme.css'
  ],

  build: {
  transpile: ['primevue'],
},

  
  primevue: {
    options: { theme: "none" },
  },
  site: {
    url: "https://finalxcard.com",
    name: "finalxcard",
  },

  app: {
    head: {
      title: "finalxcard", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "./newlogo.png",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "https://api.finalxcard.com",
    },
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
