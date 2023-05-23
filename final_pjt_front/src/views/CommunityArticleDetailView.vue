<template>
  <div>
    <h1>{{ board.title }}</h1>
    <p>{{ board.content }}</p>
    <p>작성자: {{ board.user.username }}</p>
    <p>작성일: {{ new Date(board.created_at).toLocaleDateString() }}</p>
    <p>수정일: {{ new Date(board.updated_at).toLocaleDateString() }}</p>
    <p>게시글 유형: {{ board.board_type === 0 ? 'Talk' : 'Review' }}</p>
    <router-link to="/community">Back to Community</router-link>
    
  <h2>Comments</h2>
    <div v-for="comment in board.comments" :key="comment.id">
      <p>{{ comment.user.username }}: {{ comment.content }}</p>
    </div>
    <form @submit.prevent="submitComment">
      <textarea v-model="newCommentContent" required></textarea>
      <button type="submit">댓글 작성</button>
    </form>
    <router-link to="/community">게시글 목록</router-link>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/community/boards';

export default {
  data() {
    return {
      board: null,
      newCommentContent:'',
    };
  },
  async created() {
    const response = await axios.get(`${API_URL}/${this.$route.params.id}/`);
    this.board = response.data;
  },
  methods: {
    async submitComment() {
      const loggedInUserId = 1;
      const newComment ={
        board: this.board.id,
        user:loggedInUserId,
        content:this.newCommentContent,
      };
      await axios.post(`${API_URL}/${this.board.id}/comments/`, newComment);
      this.newCommentContent = '';
    }
  },
};
</script>
