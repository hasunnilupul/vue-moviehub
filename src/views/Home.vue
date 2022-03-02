<script setup>
import Welcome from "../components/Welcome.vue"
import MostPopular from "../components/MostPopular.vue"
import Trending from "../components/Trending.vue"
</script>
<template>
  <div class="home">
    <welcome/>
    <most-popular/>
    <trending/>
  </div>
</template>

<style lang="scss" scoped>
.home {
  @apply flex flex-col;
}
</style>