<template>
      <div class="header">
        <router-link
          class="header-title"
          :to="{name:'main'}"
        >
          Discover your favorites
        </router-link>
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
    justify-content: space-between;
    align-items: center;
    padding:24px;
    
    background-color: black;
  }
  .header .header-title {
    color: #ffffff;
    cursor: pointer;
    font-weight: 700;
    font-size: 24px;
    text-decoration: none;
  }
  .header .header-title:hover {
    color: orange;
  }
</style>