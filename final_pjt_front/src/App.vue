<template>
  <div id="app">
    <div class="container">
    <b-navbar toggleable="lg" type="dark" variant="#333" v-if="!isLoginPage && !isSignupPage">
      <b-navbar-brand @click="navigateHome">
        <img class="logo" src="@/assets/Cinemayologo.png" alt="minilogo">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
          <b-nav-item :to="{ name: 'ProfileView' }" >내 프로필</b-nav-item>
          <b-nav-item :to="{ name: 'ArticleView' }">All Movies</b-nav-item>
          <b-nav-item :to="{ name: 'RecommendView' }">추천영화</b-nav-item>
          <b-nav-item :to="{ name: 'BoxOfficeView' }">박스오피스</b-nav-item>
          <b-nav-item :to="{ name: 'TagSearchView' }">태그검색</b-nav-item>
          <b-nav-item :to="{ name: 'CommunityView' }">커뮤니티</b-nav-item>
          <b-nav-item v-if="!isLogin" :to="{ name: 'SignUpView' }">SignUpPage</b-nav-item>
          <b-nav-item v-if="isLogin" @click="logout">Logout</b-nav-item>
          <b-nav-form class="search-container">
            <b-form-input v-model="searchQuery" placeholder="영화 검색어를 입력하세요" />
            <b-button size="sm" class="my-2 my-sm-0"  type="submit" @click="searchMovies">검색</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content">
    <router-view :search-results="searchResults" :search-query="searchQuery" />
  </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      // showSidebar: true,
      searchQuery: "",
      searchResults: [],
    };
  },
  computed:{
    isSignupPage() {
      return this.$route.path === '/signup'; 
    },
    isLoginPage() {
      return this.$route.path === '/login';  // adjust this path to your login page route
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "LogInView" });
        })
        .catch((error) => {
          console.error("로그아웃 중 오류 발생:", error);
        });
    },
    navigateHome(){
      this.$router.push({ name: 'HomeView'});
    },
    navigateToSearchView() {
      console.log("app", this.searchResults);
      this.$router.push({
        name: "SearchView",
        query: { searchResults: this.searchResults },
      });
    },
    searchMovies() {
      const query = this.searchQuery; // 검색어를 별도의 변수에 저장

      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KOR&page=1`;

      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTRmODVmMDA1ZDExODVkNjg3Y2Q1ZjE3NTRjY2MyZCIsInN1YiI6IjYzZDIyZDFiY2I3MWI4MDA3YzFiOGNlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwYescz-jNoCc_X2jDOxOz90oofdYLmxwwkH5XuDmGs"
      );

      const navigateToSearchView = () => {
        console.log("app", this.searchResults);
        this.$router.push({
          name: "SearchView",
          query: { searchResults: this.searchResults },
        });
      };

      fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          this.searchResults = data.results;
          navigateToSearchView();
        })
        .catch((error) => {
          console.error("검색 중 오류 발생:", error);
        });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

@font-face {
  font-family: 'Nanum Gothic';
  src: url('@/assets/fonts/NanumGothicCoding-Bold.ttf') format('truetype'); 
  font-weight: normal;
  font-style: normal;
}
html, body, #app{
  margin: 0;
  padding: 0;
  background-color: #333; /* 원하는 색상 코드로 변경 */
  /* color: #fff; */
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  color: white;
}
.app{
  display: flex;
  font-family: 'Roboto', sans-serif;
}
#sidebar{
  display: fixed;
  position: fixed; /* fixed positioning */
  top: 0; /* stick to top */
  left: 0; /* stick to left */
  height: 100%; /* full height */
  z-index: 2; /* Ensure sidebar is on top of content */
}
.container {

  padding-left: 220px; /* Make sure your sidebar width and this padding match */
}

.sidebar {
  width: 220px;
  background-color: darkgrey;
}

.content {
  width: 100%;
}
@media screen and (max-width: 768px) {
  #sidebar {
    width: 100%;
    height: auto;
  }

  .container {
    padding-left: 0;
  }
}
.navbar.navitem {
  color:lightgray;
  font-size: 25px;
}
.navbar.navitem.router-link-exact-active{
  color: orange;
}
.navbar.navitem:hover{
  color:skyblue;
}
.search-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
}
hr{
  border-color:white;
}
</style>
