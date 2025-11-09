<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


/* STRONGER SOLUTION - Add this to your style section */

/* Reset font family for entire app */
* {
  font-family: "Roboto", sans-serif !important;
}

/* Force Latin numerals globally */
html[lang="fa"] *,
html[lang="fa-IR"] *,
body * {
  font-variant-numeric: lining-nums !important;
  font-feature-settings: "lnum" !important;
  -moz-font-feature-settings: "lnum" !important;
  -webkit-font-feature-settings: "lnum" !important;
}

/* Specific fix for Persian locale */
:lang(fa) *,
:lang(fa-IR) * {
  font-variant-numeric: lining-nums !important;
  font-feature-settings: "lnum" !important;
}

/* Number-specific classes */
.number-latin,
.latin-numeral {
  font-feature-settings: "lnum" !important;
  font-variant-numeric: lining-nums !important;
  font-family: "Roboto", sans-serif !important;
}

html {
  direction: ltr;
  font-family: "Roboto", sans-serif !important;
  font-feature-settings: "lnum";
  font-variant-numeric: lining-nums;
  background: radial-gradient(circle at top right, #0a1a1a 0%, #050b14 100%);
  color-scheme: dark;
  scroll-behavior: smooth;
    unicode-bidi: plaintext;
}

/* ---------- SOLUTION FOR PERSIAN NUMBERS ISSUE ---------- */
/* Force Latin numbers for all elements */
* {
  font-variant-numeric: lining-nums !important;
  font-feature-settings: "lnum" !important;
  -moz-font-feature-settings: "lnum" !important;
  -webkit-font-feature-settings: "lnum" !important;
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
    /* Force Latin numbers */
  font-variant-numeric: lining-nums !important;
  font-feature-settings: "lnum" !important;
  -moz-font-feature-settings: "lnum" !important;
  -webkit-font-feature-settings: "lnum" !important;
  font-weight: 400;
  color: #e4f8ee;
  background: linear-gradient(180deg, #051014 0%, #071a1a 100%);
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
    unicode-bidi: plaintext;

}

/* ---------- ANIMATIONS ---------- */
* {
  transition: all 0.2s ease-in-out;
}


/* Specific targeting for numbers */
body,
div,
span,
p,
h1, h2, h3, h4, h5, h6,
a,
button,
input,
textarea,
select,
label,
li,
td,
th {
  font-variant-numeric: lining-nums !important;
  font-feature-settings: "lnum" !important;
  -moz-font-feature-settings: "lnum" !important;
  -webkit-font-feature-settings: "lnum" !important;
}

/* ---------- FONT FACE CUSTOM ---------- */
@font-face {
  font-family: "Roboto";
  src: url("./public/font/static/Roboto-Black.ttf") format("truetype");
  unicode-range: U+0030-0039; /* فقط اعداد لاتین 0–9 */
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
