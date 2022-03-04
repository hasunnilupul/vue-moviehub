<script setup>
import SelectionMenu from '../components/SelectionMenu.vue'
import {onBeforeMount, onMounted, reactive, watch} from "vue"
import MovieCard from "./MovieCard.vue"
import MovieCardsContainer from "./MovieCardsContainer.vue"
import NProgress from "nprogress";

const state = reactive({
  filters: [
    'Today',
    'This Week'
  ],
  activeFilter: 0,
  trending: [],
  loading: true
})

const fetchType = (filter) => {
  if (filter === 'Today') {
    return axios.get('trending/all/day')
  }
  if (filter === 'This Week') {
    return axios.get('trending/all/week')
  }
}

const fetchTrending = async (filterType) => {
  state.loading = true
  await fetchType(filterType)
      .then(({data}) => {
        state.trending = data.results
        state.loading = false
      }).catch(error => {
        console.log(error.response)
        state.loading = false
      })
}

onBeforeMount(() => {
  fetchTrending(state.filters[state.activeFilter])
})

onMounted(() => {
  watch(() => state.loading, (val) => {
    if (val) {
      nprogress.start()
    } else {
      nprogress.done()
    }
  })
})

const setSelectedFilter = (index) => {
  if (state.activeFilter !== index) {
    state.activeFilter = index
    fetchTrending(state.filters[state.activeFilter])
  }
}
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
      <MovieCardsContainer :loading="state.loading">
        <MovieCard v-for="(item, index) in state.trending" :key="index" :movie="item"/>
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