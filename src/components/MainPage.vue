<template>
  <div class="container">
    <div class="row">
      <MyHeader/>
      <div class="main-navigation">
        <div class="navigation-search">
          <input
            v-model="filmsSearch"
            type="text"
            placeholder="Поиск по названию"
          >
          <img width="24px" height="24px" class="svg" src="../assets/search.svg"> </div>
        <div class="navigation-filters">
          <div>
          <span
              @click="nameSort"
              class="main-button"
          >
            А-Я
          </span>
          <span
                class="main-button"
                @click="ratingSort"
            >
            Рейтинг
          </span>
          </div>
          <div>
            <span class="main-button"  @click="genresList =!genresList">Выбрать жанр</span>
            <div v-show="genresList" class="genresList">
              <div
                  class="genresList-item"
                  v-for="(filter,index) in filteredGenresArray"
                  :key="index"
                  @click="genreFilterButton(filter)"
                  :id="index"
              >
                {{filter}}
              </div>
              <div
                  class="genresList-item"
                  @click="genreFilterButton('all')"
              >
                Все жанры
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="card-list">
          <div
            v-for="(card,index) in filteredFilms"
            :key="index"
            class="card"
          >
            <router-link
              :to="{name:'FilmCard', params: {id: card.filmId}}"
            >
              <div class="card-img">
                <img :src="card.posterUrlPreview">
              </div>
            </router-link>
            <div class="card-name">{{card.nameRu}}</div>
            <div class="card-rating">{{card.rating}}</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";

  export default {
    name: 'MainPage',
    components: {MyHeader},
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
    props: [
    ],
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
      genreFilterButton(filter) {
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
      let  response = await  fetch (this.apiURL, {
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
    background-color:rgb(249 250 251);
  }
  .main-navigation {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
  }
  .navigation-search {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .navigation-search input {
    height: 20px;
    padding: 4px ;
    border-radius: 4px;
  }
  .navigation-filters {
    display: flex;
    gap: 10px;

  }
  .main-button {
    background-color:#FF6600;
    border: 1px solid rgb(163 163 163);
    padding: 8px;
    margin: 0 4px;
    border-radius: 4px;
    cursor:pointer;
    color: #ffffff;
    font-weight: 700;
  }
  .card-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    gap: 20px;
    padding: 20px;
    justify-content: space-around;
  }
  .card-list .card {
    position: relative;
    text-decoration: none;
    font-size: 24px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .card img {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
  .card-img {
    border: 1px solid black;
    width: 240px;
    height: 360px;
  }
  .card-rating {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 8px;
    margin-left: 8px;
    padding: 10px;
    border-radius: 100%;
    background-color: rgb(245 158 11);
  }
  .card-name {
    margin-left: 12px;
  }
  .genresList {
    display: flex;
    margin: 20px 0 0 0;
    border: 1px solid black;
    flex-direction: column;
    overflow-y: scroll;
    color: #ffffff;
    text-align: center;
    max-height: 100px;
    width: 200px  ;
    background-color:#FF6600;
  }
  .genresList .genresList-item {
    background-color:#FF6600;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
  }
  .genresList .genresList-item:hover {
    background-color:#1F1F1F;
  }
</style>