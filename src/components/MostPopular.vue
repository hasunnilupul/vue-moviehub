<script setup>
import SelectionMenu from '../components/SelectionMenu.vue'
import {onBeforeMount, reactive} from "vue"
import MovieCard from "./MovieCard.vue"
import MovieCardsContainer from "./MovieCardsContainer.vue"

const state = reactive({
  filters: [
    'On TV',
    'In Theaters'
  ],
  activeFilter: 0,
  popular: [],
})

const fetchType = (filter) => {
  if (filter === 'On TV') {
    return axios.get('tv/popular')
  }
  if (filter === 'In Theaters') {
    return axios.get('movie/popular')
  }
}

const fetchPopular = async (filterType) => {
  const {data} = await fetchType(state.filters[state.activeFilter]).catch(error => {
    console.log(error.response)
  })
  state.popular = data.results
}

onBeforeMount(() => {
  fetchPopular(state.filters[state.activeFilter])
})

const setSelectedFilter = (index) => {
  if (state.activeFilter !== index) {
    state.activeFilter = index
    fetchPopular(state.filters[state.activeFilter])
  }
}
</script>

<template>
  <div class="most-popular-container">
    <div class="most-popular-content">
      <div class="most-popular-header">
        <h2 class="title">{{ "What's Popular" }}</h2>
        <div class="most-popular-filter">
          <selection-menu :options="state.filters" :active="state.activeFilter" @clicked="setSelectedFilter"/>
        </div>
      </div>
      <MovieCardsContainer>
        <MovieCard v-for="(item, index) in state.popular" :key="index" :movie="item"/>
      </MovieCardsContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.most-popular-container {
  @apply flex flex-row items-center justify-between pt-4 sm:pt-8 w-full h-fit;

  .most-popular-content {
    @apply flex flex-col items-start justify-center w-full h-fit;

    .most-popular-header {
      @apply flex flex-row items-center justify-start px-5 sm:px-10 w-full;

      .title {
        @apply text-xl font-medium text-gray-800;
      }

      .most-popular-filter {
        @apply flex flex-row ml-5;
      }
    }
  }
}
</style>