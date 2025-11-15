import * as path from "path";

export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module"],

  css: [
    "@/assets/styles/global.css",
    "@/assets/styles/tailwind.css",
    "@/assets/styles/base.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "primevue/resources/primevue.min.css",
    "primevue/resources/themes/saga-blue/theme.css",
  ],

  build: {
    transpile: ["primevue"],
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
      title: "finalxcard",
      htmlAttrs: {
        lang: "en",
        dir: "ltr",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "./newlogo.png",
        },
      ],
      // ✅ اضافه شد: اسکریپت Google reCAPTCHA
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true,
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
