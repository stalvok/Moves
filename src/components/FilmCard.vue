<template>
  <div>
    <div class="card-img">
      <img :src="card.posterUrlPreview">
      <div class="card-rating">{{card.rating}}<span>/10</span></div>
    </div>
    <div class="card-name">{{card.nameRu}} | {{card.year}}</div>
  </div>
</template>

<script>


  export default {
    name: "FilmCard.vue",
    props: {
      card: {
        type: Object,
      }
    }

  }
</script>

<style scoped>
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
</style>