import api from '@/api/base.js';

const fetchArticles = () => api.get('/api/v1/articles/')


const writeArticle = ({title, content}) => 
api({
    method: 'post',
    url: `/api/v1/articles/`,
    data: {title, content},

});

export { fetchArticles, writeArticle };
