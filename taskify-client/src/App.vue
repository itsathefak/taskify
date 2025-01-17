<template>
  <div id="app">
    <Header v-if="isLoggedIn" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px; /* Height of the footer */
}

body {
  margin: 0;
  padding: 0;
}
</style>

