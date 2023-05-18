<template>
    <div id="NavBar">
      <b-button v-b-toggle.sidebar-1 variant="primary">Toggle Sidebar</b-button>
      <b-sidebar id="sidebar-1" width="200" bg-variant="light">
        <div class="px-3 py-2">
          <router-link to="/home">HOME</router-link>
          <router-link :to="{ name: 'movies' }">MOVIES</router-link>
          <router-link to="/community">COMMUNITY</router-link>
          <router-link v-if="isLoggedIn && username " :to="{ name: 'profile', params: {username} }">MYPAGE</router-link> 
          <div v-if="isLoggedIn" @click="logout">LOGOUT</div> 
        </div>
      </b-sidebar>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions} from 'vuex'
  
  export default {
    name: 'NavBar',
    methods: {
      ...mapActions(['logout'])
    },
    computed:{
      ...mapGetters(['isLoggedIn', 'currentUser']),
      username(){
        return this.currentUser.username
      }
    },
  }
  </script>
  