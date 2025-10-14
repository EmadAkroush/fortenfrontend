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
    url: "https://parsautoparts.ir",
    name: "vestavex",
  },

  app: {
    head: {
      title: "vestavex", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "./Photo_1760453095335.png",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "https://parseback.liara.run",
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
