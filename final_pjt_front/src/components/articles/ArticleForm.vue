<template>
  <div id="ArticleForm">
    <h1 id="articleFormCreateTitle" v-if="action == '작성'"> 게시글 작성하기 </h1>
    <h1 id="articleFormUpdate" v-if="action == '수정'"> 게시글 수정하기 </h1>
    <hr>
    <br>
    <h4 id="article-form-title-text">제목</h4> 
    <b-form id="article-form" @submit.prevent="postArticle(action)">
      <b-form-input  v-model="formArticle.title" id="article-form-title" placeholder="제목을 입력해주세요."></b-form-input>
      <br>
      <h4 id="article-form-content-text">내용</h4>
      <b-form-textarea v-model="formArticle.content" id="article-form-content" placeholder="내용을 입력해주세요." rows="6" max-rows="6"></b-form-textarea>
      <br>
      <b-button id="article-form-submit-button" type="submit" class="m-3">{{action}}</b-button>

      <router-link :to="{ name:'community'}">
        <b-button v-if="action == '작성'" id="article-form-cancel-button">취소</b-button>
      </router-link>

      <router-link :to="{ name:'article', params:{articlePk:article.pk} }">
        <b-button v-if="action == '수정'" id="article-form-cancel-button">취소</b-button>
      </router-link>
    </b-form>

      
  </div>
</template>

<script>
import {/* mapActions, mapGetters */} from 'vuex'

export default {
    name:'ArticleForm',
    props:{article:Object, action:String},
    data(){
        return{
            formArticle: {
                title: this.article.title,
                content: this.article.content,
            }
        }
    },
    methods: {
        ...mapActions(['articleCreate','articleUpdate']),
    postArticle(action){
        if (action === '작성'){
            console.log(this.formArticle)
            this.articleCreate(this.formArticle)
        } else if (action === '수정') {
            const updatedArticle = {
                pk : this.article.pk,
                ...this.formArticle
            }
            console.log('수정되는지확인', updatedArticle)
            this.articleUpdate(updatedArticle)
        }
    }
    },
    created() {
        console.log('articleform',this.article.title)
    }
}
</script>

<style>

</style>