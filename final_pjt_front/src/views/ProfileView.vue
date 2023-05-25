<!-- 프로필 뷰에 필요한 것 -->
<template>
  <div class="profile">
    <h1>{{ userinfo?.username }}'s USER PROFILE</h1>
    <hr />
    <p>{{ userinfo?.username }}'s Followings : {{ userinfo?.followings }}</p>
    <hr />
    <p>{{ userinfo?.username }}'s Followers : {{ userinfo?.followers }}</p>
    <hr />
    <p>{{ userinfo?.username }}'s likes : {{ userinfo?.like_boards }}</p>
    <hr />
    <p>{{ userinfo?.username }}'s Board : {{ userinfo?.boards }}</p>
    <hr />
    <p>
      {{ userinfo?.username }}'s Like Comments : {{ userinfo?.like_comments }}
    </p>
    <hr />
    <p>{{ userinfo?.username }}'s Comments : {{ userinfo?.comments }}</p>
    <hr />
    <p>{{ userinfo?.username }}'s like_movies : {{ userinfo?.like_movies }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userinfo"]),
  },
  created() {
<<<<<<< HEAD
    // if(!this.userinfo){
    this.$store.dispatch("getMyProfile");
    // }
=======
    if (this.isLogin) {
      this.$store.dispatch("getMyProfile");
      this.fetchUsers();
      this.getArticles();
    } else {
      alert("로그인이 필요한 페이지입니다...");
      this.$router.push({ name: "LogInView" });
    }
  },
  methods: {
    getArticles() {
      if (this.isLogin) {
        this.$store.dispatch("getArticles");
      } else {
        alert("로그인이 필요한 페이지입니다...");
        this.$router.push({ name: "LogInView" });
      }

      // 로그인이 되어 있으면 getArticles action 실행
      // 로그인 X라면 login 페이지로 이동
    },
    fetchUsers() {
      axios
        .get("http://127.0.0.1:8000/profile/allusers/check/") // Django API 엔드포인트를 설정하세요
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
>>>>>>> origin/main
  },
};
</script>

<style>
</style>