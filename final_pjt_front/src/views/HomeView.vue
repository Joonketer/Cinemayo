<template>
  <div>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
export default {
name: 'HomeView',
components:{
    MovieList,
},
computed:{
    isLogin(){
        return this.$store.getters.isLogin
    }
},
created(){
    this.getMovies()
},
methods: {
    getMovies() {
        if (this.isLogin) {
            this.$store.dispatch('getMovies')
        } else {
            alert('need login')
            this.$router.push({name:'LogInView'})
        }
    }
}
}
</script>

<style>

</style>