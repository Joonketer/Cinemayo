<template>
  <div class="profile">
    <h1>{{ userinfo.username }}님의 사용자 프로필</h1>
    <hr />
    <p>{{ userinfo.username }}님의 팔로잉: {{ userinfo.followings.length }}</p>
    <hr />
    <p>{{ userinfo.username }}님의 팔로워: {{ userinfo.followers.length }}</p>
    <hr />
    <p>{{ userinfo.username }}님의 좋아요 수: {{ userinfo.like_boards }}</p>
    <hr />
    <p>{{ userinfo.username }}님의 게시물 수: {{ userinfo.boards }}</p>
    <hr />
    <p>
      {{ userinfo.username }}님의 좋아요 댓글 수: {{ userinfo.like_comments }}
    </p>
    <hr />
    <p>{{ userinfo.username }}님의 댓글 수: {{ userinfo.comments }}</p>
    <hr />
    <p>
      {{ userinfo.username }}님의 좋아요 영화 수: {{ userinfo.like_movies }}
    </p>
    <div>
      <h1>가입된 사용자 목록</h1>
      <ul>
        <li v-for="user in randomUsers" :key="user.id">
          <router-link :to="`/profile/${user.username}`">{{
            user.username
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    isFollowing() {
      return this.userinfo && this.userinfo.following === true;
    },
    ...mapState(["userinfo"]),
    randomUsers() {
      const shuffledUsers = [...this.users].sort(() => Math.random() - 0.5);
      return shuffledUsers.slice(0, 5);
    },
  },
  created() {
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
  },
};
</script>

<style>
</style>
