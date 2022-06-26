<template>
  <div class="root">
    <div class="container">
      <div class="header">
        <div
          class="header-title"
          @click="$router.push({name: 'main'})"
        >
          Каталог Фильмов
        </div>
        <div>
          <select multiple>
            <option name="А-Я">А-Я</option>
            <option name="rating">rating</option>
          </select>
          <select>
            <option>Боевик</option>
            <option>Комедия</option>
            <option>Драмма</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyHeader.vue"
  }
</script>

<style scoped>
  .root {
    margin-bottom: 70px;
  }
  .container {
    padding: 0 32px;
    background-color: rgb(17 24 39);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    background-color: rgb(17 24 39);
  }
  .header .header-title {
    color: white;
    cursor: pointer;
    font-size: 20px;
  }
  .header .header-title:hover {
    color: red;
    font-weight: 900;
  }
</style>