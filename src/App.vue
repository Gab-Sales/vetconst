<template>
  <div id="app">
    <Login v-if="getUser == null"/>
    <Base v-else />  
  </div>
</template>
<script>
import Login from '@/views/Login'
import Base from '@/views/Base'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getUser'])
  },
  components: {
    Login,
    Base
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
