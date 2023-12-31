<template>
  <b-container fluid class="d-flex align-items-center justify-content-center vh-100 bg-#333 text-white">
    <b-card border-variant="light" class="text-white bg-dark" style="width: 30rem;">
      <b-card-body>
        <div v-if="board">
          <b-card-title>{{ board.title }}</b-card-title>
          <b-card-text>{{ board.content }}</b-card-text>
          <p>작성자: {{ board.user.username }}</p>
          <p>작성일: {{ new Date(board.created_at).toLocaleDateString() }}</p>
          <p>수정일: {{ new Date(board.updated_at).toLocaleDateString() }}</p>
          <p>게시글 유형: {{ board.board_type === 0 ? "Talk" : "comment" }}</p>

          
        
          <b-button 
              v-if="isCurrentUser(board.user.username)" 
              variant="warning" 
              :to="{ name: 'CommunityArticleUpdateView' }"
          >
              수정
          </b-button>

          <b-button
            v-if="isCurrentUser(board.user.username)"
            @click="deleteBoard(board.id)"
            variant="danger"
          >
            삭제
          </b-button>
          <b-button
            v-if="!isCurrentUser(board.user.username)"
            @click="likeBoard(board.id)"
          >
            좋아요
            {{
              (Array.isArray(board?.like_users) && board?.like_users.length) || 0
            }}개
          </b-button>
          <hr />
          <!-- 리뷰 작성 폼 -->
          <b-form @submit.prevent="submitcomment">
            <b-form-textarea
              v-model="commentContent"
              placeholder="댓글을 작성하세요"
            ></b-form-textarea>
            <p>작성자: {{ currentUser.username }}</p>
            <b-button type="submit">리뷰 작성</b-button>
          </b-form>
          <hr />
          <!-- 작성된 댓글 목록 -->
          <div v-if="board.comments && board.comments.length > 0">
            <h2>댓글 목록</h2>
            <ul>
              <li v-for="comment in board.comments" :key="comment.id">
                {{ comment.content }} - 작성자:
                {{ comment.user.username }}
                <b-button
                  v-if="!isCurrentUser(comment.user.username)"
                  @click="likecomment(comment.id)"
                >
                  좋아요
                  {{
                    (Array.isArray(comment?.like_users) &&
                      comment?.like_users.length) ||
                    0
                  }}개
                </b-button>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>리뷰가 없습니다.</p>
          </div>
          <router-link to="/community">Back to Community</router-link><br />
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const API_URL = "http://127.0.0.1:8000/api/v1/community/boards";

export default {
  data() {
    return {
      board: null,
      commentContent: "",
      userVoteAverage: "1",
      currentUser: "",
    };
  },
  computed: {
    ...mapState(["token"]),
    isLogin() {
      return this.$store.getters.isLogin; // 로그인 여부
    },
  },
  async created() {
    this.getArticles();
    this.getCurrentUser();
    await this.getBoardDetail();
  },
  methods: {
    deleteBoard(boardId) {
      axios
        .delete(`${API_URL}/${boardId}/`, {
          headers: { Authorization: `Token ${this.token}` },
        })
        .then(() => {
          this.$router.push({ name: "CommunityView" }); // 삭제 후 커뮤니티 페이지로 이동
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    getCurrentUser() {
      // 현재 로그인된 사용자 정보를 가져오는 API 호출
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/accounts/user/`, // 사용자 정보를 반환하는 API 엔드포인트
        headers: { Authorization: `Token ${this.token}` },
      })
        .then((res) => {
          this.currentUser = res.data; // 사용자 정보 전체를 저장
          this.user_id = res.data.pk;

          // 사용자 정보를 가져온 후에 리뷰를 가져오는 메소드 호출
          this.getBoardDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async submitcomment() {
      if (this.commentContent) {
        try {
          const formData = new FormData();
          formData.append("board", this.board.id);
          formData.append("content", this.commentContent);
          formData.append("user_id", this.currentUser.id);

          await axios.post(
            `http://127.0.0.1:8000/api/v1/community/comments/${this.board.id}/comments/`,
            formData,
            {
              headers: { Authorization: `Token ${this.token}` },
            }
          );

          this.commentContent = "";
          this.userVoteAverage = "1";
          await this.getBoardDetail();
        } catch (err) {
          console.log(err);
        }
      }
    },
    likecomment(commentId) {
      axios
        .post(
          `http://127.0.0.1:8000/api/v1/community/comments/${commentId}/like/`,
          null,
          {
            headers: { Authorization: `Token ${this.token}` },
          }
        )
        .then(() => {
          this.getBoardDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getBoardDetail() {
      try {
        const response = await axios.get(
          `${API_URL}/${this.$route.params.id}/`
        );
        this.board = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    likeBoard(boardId) {
      axios
        .post(`${API_URL}/${boardId}/like/`, null, {
          headers: { Authorization: `Token ${this.token}` },
        })
        .then(() => {
          this.getBoardDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isCurrentUser(userId) {
      return this.currentUser && this.currentUser.username === userId;
    },
  },
};
</script>
