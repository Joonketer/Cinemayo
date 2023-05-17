<template>
  <div>
    <button @click="showLoginModal=True">로그인</button>
    <button @click="showSignUpModal=True">회원가입</button>
    <LoginModal v-if="showLoginModal" @close="showLoginModal=false"/>
    <SignUpModal v-if="showSignUpModal" @close="showSignUpModal=false"/>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'

export default {
    name:'intro',
    components:{
        LoginModal,
        SignUpModal,
    },
    data() {
        return {
            showLoginModal:false,
            showSignUpModal:false
        }
    }
}
</script>

<style>

</style>