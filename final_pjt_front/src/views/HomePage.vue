<template>
  <div>
    <div>
    <nav-bar id="navbar"></nav-bar>
    </div>
    <h1>this is Home Page</h1>
  </div>
</template>

<script>
import NavBar from '@/components/home/NavBar.vue';

export default {
  name:'home',
  components: {NavBar},
}
</script>

<style>

</style>