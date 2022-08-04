<template>
  <div class="container">
    <div class="row">
      <MyHeader/>
      <div v-if="Film" class="card">
        <img :src="Film.posterUrlPreview">
        <div class="card-list">
          <div class="card-list-item"><span>{{Film.nameRu}}</span></div>
          <div class="card-list-item">Оригинальное название: <span>{{Film.nameEn}}</span></div>
          <div class="card-list-item">Год выпуска: <span>{{Film.year}}</span></div>
          <div class="card-list-item">Рейтинг фильма: <span>{{Film.rating}}</span></div>
          <div class="card-list-item">Продолжительность фильма: <span>{{Film.filmLength}}</span></div>
          <div class="genres">
            <div>Жанры:</div>
            <span class="genre" v-for="(genre,index) in Film.genres" :key="index">
            {{genre.genre}}
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  export default {
    name: "FilmPage.vue",
    components:{MyHeader},
    data() {
      return {
        AllFilms:[],
        apiURL:'https://kinopoiskapiunofficial.tech/api/v2.2/films/top',
        Film: undefined
      }
    },
    async created() {
      let response = await fetch (this.apiURL, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'cb8f0126-a908-4e5c-a76d-71403d99bfbd',
          'Content-Type': 'application/json',
        },
      })
      let content = await response.json()
      this.AllFilms = content.films
      this.Film = this.AllFilms.find(film => film.filmId == this.$route.params.id)
    },
  }
</script>
<style scoped>
  body {
    font-family: sans-serif;
  }
  .container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-color:rgb(243 244 246) ;
  }
  .row {
    max-width: 1280px;
    background-color:rgb(249 250 251);
  }
  .genres {
    display: flex;
    gap: 5px;
    color: #FF6600;
  }
  .genre {
    white-space: nowrap;
  }
  .genres span  {
    color: #1F1F1F;
  }
  .card-list-item {
    color: #FF6600;
  }
  .card-list-item span  {
    color: #1F1F1F;
  }
  .genre:not(:last-child):after {
    content:","
  }
  .card {
    padding: 16px;
    display: flex;
    gap: 40px;
    justify-content: space-around;

  }
  .card-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 22px;
    font-weight: 700;
  }
</style>