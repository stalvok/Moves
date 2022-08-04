<template>
  <div class="container">
    <div class="row">
      <MyHeader/>
      <div class="navigation">
        <div class="navigation-search">
          <input
            v-model="filmsSearch"
            type="text"
            placeholder="Поиск по названию"
          >
          <img
            width="24px"
            height="24px"
            class="svg"
            src="../assets/search.svg"
          >
        </div>
        <div class="navigation-filters">
          <div
            @click="nameSort"
            class="button"
            :class="{'active':currentSort === 'nameRu'}"
          >
            А-Я
          </div>
          <div
            class="button"
            @click="ratingSort"
            :class="{'active':currentSort === 'rating'}"
          >
            Рейтинг
          </div>
          <div
            class="button"
            @click="genreFilterButton('all')"
            :class="{'active':currentGenre === 'all'}"
          >
            Все жанры
          </div>
        </div>
      </div>
      <div class="content">
        <div class="card-list">
          <div
            v-for="(card,index) in filteredFilms"
            :key="index"
            class="card"
          >
            <router-link :to="{name:'FilmPage', params: {id: card.filmId}}">
              <FilmCard  class="card" :card="card"/>
            </router-link>
          </div>
        </div>
        <div class="sidebar">
          <div>
            <div class="genresList">
              <div
                class="genresList-item"
                @click="genresList =!genresList"
              >
                жанр
              </div>
              <div
                class="genresList-item"
                v-for="(filter,index) in filteredGenresArray"
                :key="index"
                :class="{'button':filter === currentGenre}"
                @click="genreFilterButton(filter, index)"
                :id="filter"
              >
                {{filter}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  import FilmCard from "@/components/FilmCard";

  export default {
    name: 'MainPage',
    components: {MyHeader,FilmCard},
    data() {
      return {
        AllFilms: [],
        filmsSearch: '',
        currentGenre: 'all',
        currentSort: 'rating',
        genresList:false,
        arrFilm:[],
        apiURL:'https://kinopoiskapiunofficial.tech/api/v2.2/films/top',
      }
    },
    computed: {
      computedFilms() {
        let result
        if ( this.currentGenre !== 'all') {
           result = this.AllFilms.filter(film => film.genres.find(genre => genre.genre === this.currentGenre))
        } else {
          result = this.AllFilms
        }
        if (this.currentSort === 'nameRu' ) {
          result.sort((a,b) =>  a[this.currentSort] > b[this.currentSort] ? 1 : -1  )
        }
        if (this.currentSort === 'rating' ) {
          result.sort((a,b) =>  b[this.currentSort] - a[this.currentSort]  )
        }
        return result
      },
      filteredFilms1() {
        let genresArray = []
        for (let i = 0; i < this.AllFilms.length; i++) {
           for (let j = 0; j < this.AllFilms[i].genres.length; j++) {
             genresArray.push(this.AllFilms[i].genres[j].genre)
          }
        }
        return genresArray
      },
      filteredFilms() {
        return this.computedFilms.filter(card => {
          return card.nameRu.toUpperCase().indexOf(this.filmsSearch.toUpperCase()) !== -1
        })
      },
      filteredGenresArray() {
        return this.filteredFilms1.filter((genre,i,arr) => arr.indexOf(genre) === i);
      },
    },
    methods: {
      genreFilterButton(filter,) {
         if (this.currentGenre === 'all') {
           this.currentGenre = filter
         }
         else if (filter === this.currentGenre) {
          this.currentGenre = 'all'
         } else if (filter !== this.currentGenre) {
          this.currentGenre = filter
        }
      },
      ratingSort() {
        this.currentSort = 'rating'
      },
      nameSort() {
        this.currentSort = 'nameRu'
      },
    },
    async mounted () {
      let  response = await fetch (this.apiURL, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'cb8f0126-a908-4e5c-a76d-71403d99bfbd',
          'Content-Type': 'application/json',
        },
      })
      let content = await response.json()
      this.AllFilms = content.films
      console.log(this.AllFilms)
      console.log(content)
    },
  }
</script>
<style scoped>
  .container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-color:rgb(243 244 246) ;
  }
  .row {
    max-width: 1280px;
    padding: 0 18px;
    background-color:rgb(249 250 251);
  }
  .button {
    background-color:#FA6808;
    padding: 8px;
    margin: 0 4px;
    border-radius: 10px;
    cursor:pointer;
    color: #ffffff;
    font-weight: 700;
    box-shadow: 0 0 10px rgba(0,0,0,0.4)
  }
  .button.active {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .5);
   }

  .navigation {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
  .navigation-search  {
    position: relative;
  }
  .navigation-search img {
    position: absolute;
    top: 25%;
    right: 5%;
  }
  .navigation-search input {
    height: 20px;
    padding: 16px 24px;
    background-color: #F0F4F7;
    font-family: sans-serif;
    border-radius: 8px;
    border: none;
  }
  .navigation-filters {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .content {
    display: flex;
  }
  .card-list {
    display: grid;
    grid-template-columns: repeat(3,minmax(200px,250px));
    width: 100%;
    gap: 32px;
    justify-items: start;
  }
  .card-list .card {
    text-decoration: none;
    font-size: 24px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    text-align: center;
  }
  .card img {
    border-radius: 30px;
    height: 100%;
    width: 100%;
    object-fit: fill;
    box-shadow: 0 0 10px rgba(0,0,0,0.4)
  }
  .card-img {
    position: relative;
    width: 240px;
    height: 360px;
  }
  .card-rating {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate();
    font-size: 16px;
    margin: 24px 0 0 24px;
    font-weight: 700;
    color: #ffffff;
  }
  .card-rating > span {
    font-weight: 400;
    font-size: 18px;
  }
  .card-name {
    padding: 10px 0;
    font-size: 16px;
    font-weight: 700;
  }
  .genresList {
    display: flex;
    margin: 20px 0 0 0;
    gap: 4px;
    font-size: 18px;
    flex-direction: column;
    color: #AFAEAE;
  }
  .genresList .genresList-item {
    font-weight: 500;
    padding: 8px;
    cursor:pointer;
    border-radius: 10px;
  }
  .genresList .genresList-item:first-letter {
    text-transform: uppercase
  }
  .genresList .genresList-item:first-child {
    font-size: 22px;
    color:#1F1F1F;
    font-weight: 700;
  }
  .genresList .genresList-item:hover:not(:first-child) {
    background-color:#FA6808;
    font-weight: 700;
    color: #ffffff;
  }
  .sidebar {
    display: flex;
    padding: 16px;
    flex-direction: column;
    width: 180px;
  }
  @media(max-width: 900px) {
    .card-list {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>