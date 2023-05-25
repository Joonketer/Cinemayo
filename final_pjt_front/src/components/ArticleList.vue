<!-- <template>
  <div class="article-list">
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem";

export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
  methods: {
    loadMoreArticles() {
      this.page += 1;
      this.$store.dispatch("getArticles", this.page);
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.loadMoreArticles();
      }
    });
  },
};
</script>
<style>
.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.article-list > * {
  flex-basis: calc(33.3333% - 1em);
}
</style> -->

<template>
  <div>
    <div class="article-list">
      <ArticleListItem
        v-for="article in paginatedArticles"
        :key="article.id"
        :article="article"
      />
    </div>
    <div class="load-more" v-if="currentPage < totalPages">
      <button @click="loadMoreArticles">Load More</button>
    </div>
  </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem";

export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 50,
    };
  },
  methods: {
    loadMoreArticles() {
      this.currentPage++;
      this.$store.dispatch("getArticles", this.currentPage);
    },
  },
};
</script>

<style scoped>
.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.load-more button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.load-more button:hover {
  background-color: darkgray;
}
</style>
