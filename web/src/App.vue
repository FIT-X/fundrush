<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #0b7ce6;
    &.router-link-exact-active {
      color:#033279;
    }
  }
}
</style>
