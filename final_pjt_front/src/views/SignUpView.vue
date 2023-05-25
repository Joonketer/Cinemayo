
<template>
  <b-container fluid class="d-flex align-items-center justify-content-center vh-100 bg-#333 text-white">
    <b-card class="text-white bg-dark" style="width: 30rem;">
      <h1 class="text-center">회원가입</h1>
      <b-card-body>
        <form @submit.prevent="signUp">
          <b-form-group label="아이디 : " label-for="username" label-class="text-white">
            <b-form-input id="username" v-model="username"></b-form-input>
          </b-form-group>

          <b-form-group label="비밀번호 : " label-for="password1" label-class="text-white">
            <b-form-input type="password" id="password1" v-model="password1"></b-form-input>
          </b-form-group>

          <b-form-group label="비밀번호 확인 : " label-for="password2" label-class="text-white">
            <b-form-input type="password" id="password2" v-model="password2"></b-form-input>
          </b-form-group>
          <p>이미 회원이시면,
          <router-link  to="/login">
            로그인
          </router-link>
          </p>
          <div class="d-flex justify-content-center">
          <b-button type="submit" variant="light">SignUp</b-button>
          </div>
        </form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, password1, password2
      }

      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style scoped>
.h-100 {
  height: 100vh;
}
</style>
