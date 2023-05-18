<template>
  <div>
    <button @click="showLoginModal=true">로그인</button>
    <button @click="showSignUpModal=true">회원가입</button>
    <LoginModal v-if="showLoginModal" @loginSuccess="navigateToHomePage" @close="showLoginModal=false"/>
    <SignUpModal v-if="showSignUpModal" @signUpSuccess="navigateToHomePage" @close="showSignUpModal=false"/>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'

export default {
    name:'IntroPage',
    components:{
        LoginModal,
        SignUpModal,
    },
    data() {
        return {
            showLoginModal:false,
            showSignUpModal:false
        }
    },
    methods: {
      navigateToHomePage() {
        this.$router.push('/home')
      }
      }
    }
</script>

<style>

</style>