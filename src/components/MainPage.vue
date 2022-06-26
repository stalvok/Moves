<template>
  <div class="container">
    <div class="row">
      <MyHeader/>
      <input v-model="filmsSearch" type="text">
      <button @click="nameSort">А-Я</button>
      <button @click="ratingSort">rating</button>
      <button>TEST</button>
      <div class="display:flex">
        <button
            v-for="(filter,index) in filteredGenresArray"
            :key="index"
            @click="genreFilterButton(filter)"
            :class="{ active: isActive}"
        >
          {{filter}}
        </button>
        <button
            :class="{ active: isActive}"
            @click="genreFilterButton('all')"
        >
          Все жанры
        </button>
      </div>
      <div>
        <div class="card-list">
          <div
            v-for="(card,index) in filteredFilms"
            :key="index"
            class="card"
          >
            <router-link
              :to="{name:'FilmCard', params: {id: card.filId}}"
            >
              <div class="card-img">
                <img :src="card.posterUrlPreview">
              </div>
            </router-link>
            <div class="card-name">{{card.nameRu}}</div>
            <div class="card-rating">{{card.rating}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  import films from "@/Mock/AllFilms";
  export default {
    name: 'MainPage',
    components: {MyHeader},
    data() {
      return {
        AllFilms: films,
        filmsSearch: '',
        currentGenre: 'all',
        currentSort: 'nameRu',
        isActive: true,
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
      genreFilterButton(filter) {
        this.currentGenre = filter
        this.isActive = !this.isActive
      },
      ratingSort() {
        this.currentSort = 'rating'
      },
      nameSort() {
        this.currentSort = 'nameRu'
      }
    },
  }
  fetch ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', {
    method: 'GET',
    headers: {
      'X-API-KEY': 'cb8f0126-a908-4e5c-a76d-71403d99bfbd',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
</script>

<style scoped>
  .active {
    border: 4px solid green;
  }
  .container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-color:rgb(17 24 39);
  }
  .row {
    max-width: 1280px;
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
    color: white;
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
    width: 240px;
    height: 360px;
    border:4px solid black;
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
</style>