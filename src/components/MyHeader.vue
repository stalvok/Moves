<template>
  <div class="row">
    <div class="container">
      <div class="header">
        <div
          class="header-title"
          @click="$router.push({name: 'main'})"
        >
          Каталог Фильмов
        </div>
        <div>
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
  .row {
    margin-bottom: 70px;
  }
  .container {
    background-color: rgb(17 24 39);
  }
  .header {
    display: flex;
    border: 2px solid ;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    min-height: 100px;
    background-color:#1F1F1F;
  }
  .header .header-title {
    color: white;
    cursor: pointer;
    font-size: 20px;
  }
  .header .header-title:hover {
    color: orange;
  }
</style>