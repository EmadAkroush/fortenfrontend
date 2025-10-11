<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<style>
html {
  direction: ltr;
  font-family: numregular;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0b6d20;
}

@font-face {
  font-family: numregular;
  src: url(././public/font/static/Roboto-Medium.ttf);
}
body {
  font-family: numregular;
  color: #050B20;
}
</style>


