<template>
  <div id="app">
    <Navbar v-if="getUser !== null" />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getUser'])
  },
  components: {
    Navbar
  }
}
</script>

<style>
body {
  margin: 0 !important;
}

#app {
  text-align: center;
}
</style>
