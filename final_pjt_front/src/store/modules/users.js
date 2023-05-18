import api from '@/api/base.js'
import {fetchLogin, fetchSignup} from '@/api/user/index.js'

export default {
    state: {
      token: null,
    },
    getters: {
      isLogin(state) {
        if (state.token) {
          api.setToken(state.token);
        } else {
          api.clearToken();
        }
        return state.token ? true : false;
      },
    },
    mutations: {
      SAVE_TOKEN(state, token) {
        state.token = token;
      },
    },
    actions: {
      signUp(context, payload) {
        const username = payload.username;
        const password1 = payload.password1;
        const password2 = payload.password2;
  
        fetchSignup({ username, password1, password2 })
          .then((key) => {
            context.commit('SAVE_TOKEN', key);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      login(context, payload) {
        const username = payload.username;
        const password = payload.password;
  
        fetchLogin({ username, password })
          .then((res) => {
            context.commit('SAVE_TOKEN', res.data.key);
          })
          .catch((err) => console.log(err));
      },
      logout(context) {
        context.commit('SET_TOKEN', null);
      },
    },
  };
  