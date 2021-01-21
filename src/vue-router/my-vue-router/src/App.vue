<template>
  <div id="app">
    <router-link to="/home">HOme</router-link>
    <router-link to="/about">ABout</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './components/Home.vue'
// import About from './components/About.vue'

export default {
  name: 'App',
  components: {
    // Home,
    // About
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
