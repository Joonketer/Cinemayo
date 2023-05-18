import api from '@/api/base.js';

const fetchLogin = function ({ username, password }) {
  return api({
    method: 'post',
    url: '/accounts/login/',
    data: {
      username,
      password,
    },
  });
};

const fetchSignup = ({ username, password1, password2 }) =>
  api({
    method: 'post',
    url: '/accounts/signup/',
    data: {
      username,
      password1,
      password2,
    },
  }).then((res) => res.data.key);

export { fetchLogin, fetchSignup };
