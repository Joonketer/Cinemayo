<template>
    <div>
      <h1>Daily Box Office</h1>
      <ul>
        <li v-for="movie in WeeklyBoxOfficeList" :key="movie.movieCd">
          <h2>{{ movie.movieNm }}</h2>
          <p>Rank: {{ movie.rank }}</p>
          <p>Sales: {{ movie.salesAmt }}</p>
          <p>Audience: {{ movie.audiCnt }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dailyBoxOfficeList: []
      };
    },
    mounted() {
      this.fetchweeklyBoxOffice();
    },
    methods: {
      fetchweeklyBoxOffice() {
        const apiKey = 'f5eef3421c602c6cb7ea224104795888';
        let today = new Date();
        // const targetDt = '20120101'; // Replace with the desired date in yyyymmdd format
        
        const targetDt = today;
  
        const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${apiKey}&targetDt=${targetDt}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.boxOfficeResult.weeklyBoxOfficeList) {
              this.weeklyBoxOfficeList = data.boxOfficeResult.weeklyBoxOfficeList;
            }
          })
          .catch(error => {
            console.error('Error fetching weekly box office:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  