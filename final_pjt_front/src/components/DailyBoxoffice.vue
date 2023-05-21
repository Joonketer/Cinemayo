<template>
    <div>
      <h1>Daily Box Office</h1>
      <ul>
        <li v-for="movie in dailyBoxOfficeList" :key="movie.movieCd">
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
      this.fetchDailyBoxOffice();
    },
    methods: {
      fetchDailyBoxOffice() {
        const apiKey = 'f5eef3421c602c6cb7ea224104795888';
        let today = new Date();
        // const targetDt = '20120101'; // Replace with the desired date in yyyymmdd format
        
        const targetDt = today;
  
        const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${targetDt}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.boxOfficeResult.dailyBoxOfficeList) {
              this.dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            }
          })
          .catch(error => {
            console.error('Error fetching daily box office:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  