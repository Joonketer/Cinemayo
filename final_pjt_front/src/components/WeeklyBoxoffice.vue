
   <template>
  <div>
    <h1>Weekly Box Office</h1>
    <div>
      <div v-for="box2movie in weeklyBoxOfficeList" :key="box2movie.movieCd">
        <p>Rank: {{ box2movie.rank }}</p>
        <h2>{{ box2movie.movieNm }}</h2>
        <p>관객동원수: {{ box2movie.audiCnt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      weeklyBoxOfficeList: [],
    };
  },
  mounted() {
    this.fetchWeeklyBoxOffice();
  },
  methods: {
    fetchWeeklyBoxOffice() {
      const apiKey = "f5eef3421c602c6cb7ea224104795888";
      const WEEKLY_BOXOFFICE_API_URL = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json`;
      let today = new Date();
      let targetDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      let todayYear = targetDate.getFullYear();
      let todayMonth = targetDate.getMonth() + 1;
      let todayDate = targetDate.getDate();
      let targetDt = `${todayYear}${todayMonth
        .toString()
        .padStart(2, "0")}${todayDate.toString().padStart(2, "0")}`;
      axios({
        method: "get",
        url: `${WEEKLY_BOXOFFICE_API_URL}?key=${apiKey}&targetDt=${targetDt}`,
      })
        .then((res) => {
          console.log(res);
          if (res.data.boxOfficeResult.weeklyBoxOfficeList) {
            this.weeklyBoxOfficeList =
              res.data.boxOfficeResult.weeklyBoxOfficeList;
          }
        })
        .catch((error) => {
          console.error("Error fetching weekly box office", error);
        });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
