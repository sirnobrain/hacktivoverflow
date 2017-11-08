<template>
  <div id="app">
    <Toolbar></Toolbar>
    <div id="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  name: 'app',
  components: { Toolbar }
}
</script>

<style>
#main-container {
  padding: 32px 128px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
