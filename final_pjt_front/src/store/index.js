import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'
import djangourl from '@/urls/djangourl'


const API_URL = 'http://127.0.0.1:8000'


Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    articles: [
    ],
    token: null,
    popularMovies:[],
    popularPage:1,
    topRatedMovies:[],
    topRatedPage:1,
    movies:[],
    page:1,
    itemsperpage:10,
    topRatedStartIndex:50,
    state: {
      token: localStorage.getItem('token') || '',
      currentUser: {},
      userProfile: {},
      authError: null,
    },

  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    currentUser(state) {
      return state.currentUser
    },
    //profile은 대상 유저의 기본 정보 + 작성글/좋아요글/(+작성댓글/좋아요댓글/본영화/보고싶은영화/기타)
    userProfile(state) {
      console.log(state.userProfile.username)
      return state.userProfile
    },
    authError(state) {
      return state.authError
    },
    //유저 인증을 위해 axios 요청 보낼 때 필수적으로 보내야됨. token이 있으면 authHeadr를 getter로 불러올 수 있음
    authHeader(state) {
      return ({Authorization: `Token ${state.token}`})
    }
  },
  mutations: {
    SET_TOKEN(state, token){
      return state.token = token
    },
    SET_CURRENT_USER(state, user) {
      console.log('지금 커런트 유저 설정됨', user)
      return state.currentUser = user
    },
    SET_USER_PROFILE(state, userProfile) {
      console.log('userprofile mutation',userProfile)
      return state.userProfile = userProfile
    },
    SET_USER_PROFILE_FOLLOW(state, userProfile) {
      return state.userProfile = userProfile

    },
    SET_AUTH_ERROR(state, error) {
      return state.authError = error
    },
    SET_ALL_MOVIES(state,movies){
      state.movies=movies;
    },
    SET_POPULAR_MOVIES(state){
      const start = (state.popularPage - 1) * 5;
      
      state.popularMovies = state.movies.sort((a,b)=>b.popularity - a.popularity).slice(start,start+5)
      // state.popularMovies = movies.slice(0,5)
    },
    SET_TOP_RATED_MOVIES(state){
      // const start = (state.topRatedPage - 1) * 5;
      const start = state.topRatedStartIndex;
      const end= start +5
      state.topRatedMovies = state.movies.sort((a,b) => b.vote_average - a.vote_average).slice(start, end);
      // state.topRatedMovies = state.movies.sort((a,b) => b.vote_average - a.vote_average).slice(start,start+5);
      // state.topRatedMovies = movies.slice(0,5)
    },
    INCREMENT_POPULAR_PAGE(state) {
      state.popularPage += 1;
    },
    DECREMENT_POPULAR_PAGE(state) {
      if (state.popularPage > 1) {
        state.popularPage -= 1;
      }
    },
    INCREMENT_TOP_RATED_PAGE(state) {
      state.topRatedPage += 1;
    },
    DECREMENT_TOP_RATED_PAGE(state) {
      if (state.topRatedPage > 1) {
        state.topRatedPage -= 1;
      }
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'ArticleView' }) // store/index.js $router 접근 불가 -> import를 해야함
    },
    GET_MOVIES(state, movies){
      state.movies = movies;
    },
    RESET_PAGE(state){
      state.popularPage=1;
      state.topRatedPage=1;
    },
},
  actions: {
    nextPopularPage(context) {
      context.commit('INCREMENT_POPULAR_PAGE');
      context.dispatch('getMovies');
    },
    previousPopularPage(context) {
      context.commit('DECREMENT_POPULAR_PAGE');
      context.dispatch('getMovies');
    },
    nextTopRatedPage(context) {
      context.commit('INCREMENT_TOP_RATED_PAGE');
      context.dispatch('getMovies');
    },
    previousTopRatedPage(context) {
      context.commit('DECREMENT_TOP_RATED_PAGE');
      context.dispatch('getMovies');
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((res) => {
          // console.log(res, context)
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((res) => {
          
          const movies = Array.isArray(res.data)?res.data:[];
          context.commit('SET_ALL_MOVIES', movies)
          context.commit('SET_POPULAR_MOVIES');
          context.commit('SET_TOP_RATED_MOVIES');
          context.commit('RESET_PAGE');
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setToken({commit}, token){
      commit('SET_TOKEN', token)
      console.log('setToken완료')
      localStorage.setItem('token',token)
    },
    removeToken({commit}){
      commit('SET_TOKEN')
      localStorage.setItem('token','')
    },

    signUp({commit, dispatch, getters}, credentials){
      axios({
        url: djangourl.accounts.signup(),
        method: 'post',
        data: credentials
      })
      .then(res => {
        dispatch('setToken', res.data.key)
        dispatch('getCurrentUser')
        setTimeout(
          function(){
            console.log('회원가입 후 currentUser',getters.currentUser)
            dispatch('getUserProfile', {username: getters.currentUser.username})
            router.push({name: 'profile', params:{ username: getters.currentUser.username }})
          }, 10
        )
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    login({commit, dispatch, getters}, credentials){
      console.log('login에서', credentials)
      axios({
        url: djangourl.accounts.login(),
        method: 'post',
        data: credentials
      })
      .then(res => {
        dispatch('setToken', res.data.key)
        dispatch('getCurrentUser')
        //로그인과 회원가입 기능에서getCurrentUser하고 바로 getUserProfile하니 계속 그 전에 로그인되어 있었던 계정의 userProfile로 이동
        //setTimeout 함수를 통해 두 함수 사이에 약간의 지연을 두어 순차적으로 getCurrentUser가 완료 된 후 getUserProfile이 시행되도록 함
        setTimeout(
          function(){
            console.log('로그인 후 currentUser',getters.currentUser)
            dispatch('getUserProfile', {username: getters.currentUser.username})
            router.push({name: 'profile', params:{ username: getters.currentUser.username }})
          }, 10
        )
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },
    logout({getters, dispatch, commit}){
      if(confirm('정말로 로그아웃 하시겠습니까?')){
        axios({
          url: djangourl.accounts.logout(),
          method: 'post',
          headers: getters.authHeader
        })
        .then(() => {
          dispatch('removeToken')
          commit('SET_CURRENT_USER', {})
          alert('성공적으로 로그아웃하셨습니다!')
          router.push({name: 'home'})
        })
        .catch(err => {
          console.error(err.response.data)
        })
      }
    },
    getCurrentUser({commit, getters, dispatch}){
      if (getters.isLoggedIn){
        axios({
          url: djangourl.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          commit('SET_CURRENT_USER', res.data)
        })
        .catch(err => {
          if(err.response.status === 401) {
            dispatch('removeToken')
            router.push({ name: 'login' })
          }
        })
      }
    },

    getUserProfile({commit, getters}, {username}){
      axios({
        method: 'get',
        url: djangourl.accounts.userProfile(username),
        headers: getters.authHeader
      })
      .then(res => {
        commit('SET_USER_PROFILE', res.data)
      })
      .catch(err => {
        console.error(err.response)
      })
    },

    userFollow({commit, getters}){
      const username = getters.userProfile.username
      axios({
        method: 'post',
        url: djangourl.accounts.userFollow(username),
        headers: getters.authHeader
      })
      .then(res => {
        commit('SET_USER_PROFILE_FOLLOW', res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.error(err.response)
      })
    },
    // signUp(context, payload) {
    //   const username = payload.username
    //   const password1 = payload.password1
    //   const password2 = payload.password2

    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/accounts/signup/`,
    //     data: {
    //       username, password1, password2
    //     }
    //   })
    //     .then((res) => {
    //       // console.log(res)
    //       // context.commit('SIGN_UP', res.data.key)
    //       context.commit('SAVE_TOKEN', res.data.key)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // login(context, payload) {
    //   const username = payload.username
    //   const password = payload.password

    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/accounts/login/`,
    //     data: {
    //       username, password
    //     }
    //   })
    //     .then((res) => {
    //       context.commit('SAVE_TOKEN', res.data.key)
    //     })
    //     .catch((err) => console.log(err))
    // }
  },
  modules: {
  }
})
