<template>
  <div class="content">
    <MyHeader/>
    <div class="card">
        <img :src="film.posterUrlPreview">
      <div class="card-list">
        <div>Название: {{film.nameRu}}</div>
        <div>Оригинальное название: {{film.nameEn}}</div>
        <div>Год выпуска: {{film.year}}</div>
        <div>Рейтинг фильма: {{film.rating}}</div>
        <div class="genres">Жанры:
          <span class="genre" v-for="(genre,index) in film.genres" :key="index">
            {{genre.genre}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AllFilms from "@/Mock/AllFilms";
  import MyHeader from "@/components/MyHeader";
  export default {
    name: "FilmCard.vue",
    components:{MyHeader},
    data() {
      return {
        AllFilms,
      }
    },
    props: {
    },
    created() {
      const film = AllFilms.find(film => film.filId === this.$route.params.id)
      if (film) {
        this.film = film
      }
    }
  }
</script>
<style scoped>
  .content {
    background-color: rgb(17 24 39);
    min-height: 100vh;
  }
.genres {
  display: flex;
  gap: 5px;

}
.genre:not(:last-child):after {
  content: ","
}
.card {
  padding: 16px;
  border: 1px solid red;
  display: flex;
  gap: 40px;
  justify-content: space-around;

}
  .card-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 22px;
    color: green;
    font-weight: 700;
  }
</style>