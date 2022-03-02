<script setup>
import {reactive} from "vue";

const state = reactive({query: ''})

const search = () => {
  alert('Search for ' + state.query)
}
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-container-overlay">
      <div class="welcome-container-overlay-content">
        <h1 class="welcome-container-overlay-content-title">
          {{ 'Welcome.' }}
        </h1>
        <p class="welcome-container-overlay-content-description">
          {{ 'Millions of movies, TV shows and people to discover.Explore now.' }}
        </p>
      </div>
      <div class="welcome-container-overlay-search">
        <input type="text" v-model="state.query" class="welcome-container-overlay-search-input"
               placeholder="Search for a movie, tv show, actor ..."/>
        <button class="welcome-container-overlay-search-button" @click="search()">
          {{ 'Search' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-container {
  @apply flex flex-col items-center justify-center h-72 bg-cover bg-no-repeat;
  background-image: url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/2Sm3asuwKVNTzgm2nF6hp5mwEfh.jpg");

  .welcome-container-overlay {
    @apply flex flex-col items-center justify-between px-6 sm:px-12 py-10 w-full h-full;

    .welcome-container-overlay-content {
      @apply flex flex-col items-start justify-between w-full h-fit text-white;

      .welcome-container-overlay-content-title {
        @apply text-5xl font-bold mb-2;
      }

      .welcome-container-overlay-content-description {
        @apply text-2xl font-medium mb-4;
      }
    }

    .welcome-container-overlay-search {
      @apply relative flex flex-row items-center justify-between w-full h-9 sm:h-11 py-2 bg-white rounded-full;

      .welcome-container-overlay-search-input {
        @apply grow flex mx-5 pr-10 text-xs sm:text-sm font-normal placeholder-gray-500 focus:outline-none text-gray-600;
      }

      .welcome-container-overlay-search-button {
        @apply absolute right-0 flex flex-col items-center justify-center rounded-full px-5 py-2 w-fit h-9 sm:h-11 bg-gradient-to-r from-teal-500 to-blue-500 focus:outline-none text-sm font-medium text-white hover:text-gray-800;
      }
    }
  }
}
</style>
