<template>
  <div id="CommentCreate">
    <b-form @submit.prevent='commentpush'>
        <b-form-input v-model="commentContent" type="text"
        placeholder="댓글 내용을 써 주세요"></b-form-input>
        <b-button type="submit">댓글 작성</b-button>
    </b-form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name:'CommentCreate',
    data() {
        return {
            commentContent:'',
        }
    },
    methods: {
        ...mapActions(['commentCreate']),
        commentpush(){
            const payload = {
                articlePK : this.article.pk,
                content: this.commentContent,
            }
            
            this.commentCreate(payload)
            this.commentContent=''
        }
    },
    
}
</script>

<style>

</style>