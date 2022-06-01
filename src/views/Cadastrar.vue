<template>
  <div>
    <div>User {{ test }}</div>
  </div>
</template>
<script>
export default {
    name: 'Cadastrar',
    mounted(){
        console.log(this.$route)
    },
    props: ['test']
}
</script>
<style>
</style>