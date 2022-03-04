<script setup>
import SelectionMenu from '../components/SelectionMenu.vue'
import {onBeforeMount, onMounted, reactive, watch} from "vue"
import MovieCard from "./MovieCard.vue"
import MovieCardsContainer from "./MovieCardsContainer.vue"

const state = reactive({
  filters: [
    'On TV',
    'In Theaters',
  ],
  activeFilter: 0,
  trailers: [],
  loading: true
})

const fetchType = (filter) => {
  if (filter === 'On TV') {
    return axios.get('latest-trailers/all/day')
  }
  if (filter === 'In Theaters') {
    return axios.get('latest-trailers/all/week')
  }
}

const fetchTrailers = async (filterType) => {
  state.loading = true
  await fetchType(filterType)
      .then(({data}) => {
        state.trailers = data.results
        state.loading = false
      }).catch(error => {
        console.log(error.response)
        state.loading = false
      })
}

onBeforeMount(() => {
  //fetchTrailers(state.filters[state.activeFilter])
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
    fetchTrailers(state.filters[state.activeFilter])
  }
}
</script>

<template>
  <div class="latest-trailers-container">
    <div class="latest-trailers-content">
      <div class="latest-trailers-header">
        <h2 class="title">{{ 'Latest Trailers' }}</h2>
        <div class="latest-trailers-filter">
          <selection-menu :options="state.filters" :active="state.activeFilter" @clicked="setSelectedFilter"/>
        </div>
      </div>
      <MovieCardsContainer :loading="state.loading">
        <MovieCard v-for="(item, index) in state.trailers" :key="index" :movie="item"/>
      </MovieCardsContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.latest-trailers-container {
  @apply flex flex-row items-center justify-between pt-4 sm:pt-8 w-full h-fit bg-no-repeat bg-cover bg-top;
  background-image: url('https://www.themoviedb.org/t/p/w220_and_h330_face/74xTEgt7R36Fpooo50r9T25onhq.jpg');

  .latest-trailers-content {
    @apply flex flex-col items-start justify-center w-full h-fit;

    .latest-trailers-header {
      @apply flex flex-row items-center justify-start px-6 sm:px-12 w-full;

      .title {
        @apply text-xl font-medium text-gray-800;
      }

      .latest-trailers-filter {
        @apply flex flex-row ml-5;
      }
    }
  }
}
</style>