<script setup>
import SelectionMenu from '../components/SelectionMenu.vue'
import {reactive} from "vue"
import MovieCard from "./MovieCard.vue"
import Item from "../model/Item"
import MovieCardsContainer from "./MovieCardsContainer.vue"

const state = reactive({
  filters: [
    'Today',
    'This Week'
  ],
  activeFilter: 0
})

const setSelectedFilter = (index) => {
  if (state.activeFilter !== index) {
    state.activeFilter = index
  }
}

const movieItem = new Item(1, 'Peaky Fucking Blinders', 'A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up in the world.', 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg', 'Drama, Crime', 85, 'Sep 12, 2013', 'Mar 02, 2021')
</script>

<template>
  <div class="trending-container">
    <div class="trending-content">
      <div class="trending-header">
        <h2 class="title">{{ 'Trending' }}</h2>
        <div class="trending-filter">
          <selection-menu :options="state.filters" :active="state.activeFilter" @clicked="setSelectedFilter"/>
        </div>
      </div>
      <MovieCardsContainer>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
        <MovieCard :movie="movieItem"/>
      </MovieCardsContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trending-container {
  @apply flex flex-row items-center justify-between pt-4 sm:pt-8 w-full h-fit;

  .trending-content {
    @apply flex flex-col items-start justify-center w-full h-fit;

    .trending-header {
      @apply flex flex-row items-center justify-start px-6 sm:px-12 w-full;

      .title {
        @apply text-xl font-medium text-gray-800;
      }

      .trending-filter {
        @apply flex flex-row ml-5;
      }
    }
  }
}
</style>