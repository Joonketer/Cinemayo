<template>
  <div id="SignUp">
    <h1>회원가입</h1>
    <form @submit.prevent="signUp">
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username">
        <br>
        <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1"
      @input="passwordLength">
      <span>{{ this.lengthwarning }}</span>
      <br>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2"
      @input="samePassword">
      <span>{{ this.samepasswarning }}</span>
      <br>
      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
    name: 'SignUpModal',
    data() {
        return {
            username: null,
            password1: null,
            password2: null,
            lengthwarning:'',
            samepasswarning:'',
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
        this.$store.dispatch('signUp',payload)
        },

        passwordLength() {
            if (this.password1.length < 10){
                this.lengthwarning ='10자 이상 비밀번호가 추천됩니다.'
            } else {
                this.lengthwarning = ''
            }
        },

        samePassword() {
            if (this.password1 != this.password2) {
                this.samepasswarning = '입력한 비밀번호가 같아야 합니다.'
            } else{
                this.samepasswarning = ''
            }
        }
    }
}

</script>

<style>

</style>