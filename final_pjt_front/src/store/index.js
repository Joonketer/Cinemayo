import Vue from 'vue'
import Vuex from 'vuex'
import articles from './modules/articles'
import users from './modules/users'
import movies from './modules/movies'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    movies,
    articles,
    users,
  }
})
