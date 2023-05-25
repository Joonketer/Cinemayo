<template>
  <div class="container">
    <div class="selection-box">
      <h1>태그 검색</h1>
      <div class="checkbox-grid my-3">
        <b-form-checkbox-group
          class="d-flex flex-wrap"
          stacked
          v-model="selectedGenres"
          :options="genres"
          @change="handleGenreSelection"
        ></b-form-checkbox-group>
      </div>
      <label for="year">개봉년도 : </label>
      <select id="year" v-model="selectedYear">
        <option value="">선택하지 않음</option>
        <option v-for="year in years" :key="year">{{ year }}</option>
      </select>
      <label for="rating">Rating : </label>
      <select id="rating" v-model="selectedRating">
        <option value="">선택하지 않음</option>
        <option v-for="rating in ratings" :key="rating" :value="rating">
          {{ rating }}
        </option>
      </select>
    </div>
    <b-button
      class="search-button"
      variant="dark"
      text-variant="secondary"
      @click="searchMovies"
      :disabled="selectedGenres.length === 0"
    >
      Search Movies
    </b-button>
    <div class="movies d-flex flex-wrap justify-content-around">
      <div
        class="movie-card"
        v-for="movie in movies"
        :key="movie.id"
        @click="goToDetail(movie.id)"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div class="movie-poster">
          <img
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            alt="Movie poster"
          />
          <h5 v-show="hovering" class="movie-title">
            {{ movie.title }}
            <br />
            ★ : {{ movie.vote_average }}
          </h5>
        </div>
      </div>
      <div v-if="noMovies" class="no-movies">
        <h2>'해당 태그에 맞는 영화가 없습니다!'</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
  data() {
    return {
      genres: [],
      selectedGenres: [],
      movies: [],
      years: [...Array(new Date().getFullYear() - 1969).keys()]
        .map((i) => i + 1970)
        .reverse(),
      ratings: Array.from({ length: 11 }, (_, i) => i),
      selectedYear: "",
      selectedRating: "",
      API_KEY: "93ed8c8631dfd36c74cab19d569d6745",
      searchExecuted: false,
      hovering: false,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin; // 로그인 여부
    },
    noMovies() {
      return this.searchExecuted && this.movies.length === 0;
    },
  },
  async created() {
    this.getArticles();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=ko-KR`
      );
      this.genres = response.data.genres.map((genre) => ({
        text: genre.name,
        value: genre.id,
      }));
    } catch (error) {
      console.error(error);
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
    handleGenreSelection() {
      if (this.selectedGenres.length > 3) {
        alert("최대 3개의 장르만 선택할 수 있습니다.");
        this.selectedGenres = this.selectedGenres.slice(0, 3);
      }
    },
    async searchMovies() {
      this.searchExecuted = true;
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${
          this.API_KEY
        }&with_genres=${this.selectedGenres.join(",")}&language=ko-KR&year=${
          this.selectedYear
        }`;

        if (this.selectedYear) {
          url += `&primary_release_year=${this.selectedYear}`;
        }

        if (this.selectedRating) {
          url += `&vote_average.gte=${this.selectedRating}`;
        }

        const response = await axios.get(url);

        const moviesWithDetails = await Promise.all(
          response.data.results.map(async (movie) => {
            try {
              await axios.get(`${API_URL}/api/v1/movies/${movie.id}/`);
              return movie;
            } catch (error) {
              return null;
            }
          })
        );
        this.movies = moviesWithDetails.filter(Boolean);
      } catch (error) {
        console.error(error);
      }
    },
    goToDetail(movieId) {
      this.$router.push({ name: "DetailView", params: { id: movieId } });
    },
  },
};
</script>

<style scoped>
.container {
  flex-direction: column;
}
.movies {
  justify-content: space-between;
}
.movie {
  width: 30%;
  margin-bottom: 2rem;
}
.checkbox-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 400px; /* 각 checkbox가 약 100px 넓이를 가지므로 */
  margin: 0 auto; /* 중앙 정렬 */
  font-family: "Nanum Gothic", sans-serif;
  font-weight: normal;
  color: black;
  /* grid-template-columns: repeat(5, 1fr);
  gap: 10px; */
}
.search-button {
  display: block;
  margin: 20px auto;
  background-color: darkgray; /* replace #yourcolor with the color you want */
  color: black; /* replace #yourtextcolor with the color you want for the text */
}
.selection-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Style the checkboxes */
.b-form-checkbox {
  flex-basis: calc(25% - 10px); /* 10px은 각 checkbox 사이의 간격을 고려한 값 */
  box-sizing: border-box;
  margin-bottom: 10px;
}

/* Style the checkbox labels */
.b-form-checkbox label {
  font-size: 1.5rem; /* adjust as needed */
}
.b-form-checkbox label.custom-control-label span {
  color: red; /* 변경할 색상을 지정하세요 */
}
.movie-card {
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 30%;
  border-radius: 5px;
  padding: 2%;
  margin-bottom: 2rem;
}
.movie-poster {
  position: relative;
}
.movie-card img {
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-in-out;
}
.movie-card:hover img {
  opacity: 0.5;
}
.movie-card .movie-poster {
  position: relative;
}
.movie-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.movie-card:hover:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7); /* 50% transparent black */
  border-radius: 5px;
}
.movie-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.movie-card:hover .movie-title {
  opacity: 1;
}
.movie-card h2 {
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.movie-card:hover h2 {
  opacity: 1;
}
.movie-card h5 {
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  color: white;
}
h1 {
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  color: black;
}
label {
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 100;
  color: black;
}
</style>

