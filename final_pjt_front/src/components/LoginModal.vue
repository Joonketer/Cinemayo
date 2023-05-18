<template>
  <div>
    <h1>LogIn Page</h1>
    <form @submit.prevent="login">
    <label for="username">username</label>
    <input type="text" id="username" v-model="username"><br>

    <label for="password"> password : </label>
      <input type="password" id="password" v-model="password"><br>

      <input type="submit" value="logIn">
    </form>
    <br>
    계정이 없으신가요?ㅤ
    <router-link :to="{ name: 'SignUpModal' }" style="color: #F21170">회원가입</router-link>
  </div>
</template>

<script>
export default {
    name: 'LoginModal',
    data() {
        return {
            username: null,
            password:null,
        }
    },
    methods: {
        login() {
            const username = this.username
            const password = this.password

            const payload = {
                username, password
            }

            this.$store.dispatch('login',payload).then(() => {
            this.$emit('loginSuccess');
        })
    }
  },
}
</script>

<style>

</style>