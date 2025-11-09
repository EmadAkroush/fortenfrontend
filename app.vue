<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  direction: ltr;
  font-family: "Roboto", sans-serif !important;
  font-feature-settings: "lnum";
  font-variant-numeric: lining-nums;
  background: radial-gradient(circle at top right, #0a1a1a 0%, #050b14 100%);
  color-scheme: dark;
  scroll-behavior: smooth;
}

/* ---------- SCROLLBAR (finalxcard Neon Style) ---------- */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #10b981, #06b6d4);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #34d399, #22d3ee);
}

/* ---------- BODY STYLE ---------- */
body {
  font-family: "Roboto", sans-serif !important;
  font-feature-settings: "lnum";
  font-variant-numeric: lining-nums;
  font-weight: 400;
  color: #e4f8ee;
  background: linear-gradient(180deg, #051014 0%, #071a1a 100%);
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
}

/* ---------- ANIMATIONS ---------- */
* {
  transition: all 0.2s ease-in-out;
}

/* ---------- FONT FACE CUSTOM ---------- */
@font-face {
  font-family: "Roboto";
  src: url("./public/font/static/Roboto-Black.ttf") format("truetype");
  font-display: swap;
}

/* ---------- LINKS / BUTTONS DEFAULT ---------- */
a {
  color: #22d3ee;
  text-decoration: none;
}
a:hover {
  color: #10b981;
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

/* ---------- SELECTION ---------- */
::selection {
  background: rgba(16, 185, 129, 0.4);
  color: #fff;
}

/* ---------- SMOOTH HOVER FX FOR LAYOUTS ---------- */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
