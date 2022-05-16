<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
}

body {
  background-color: #2f333a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ffdab9;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
