<script setup>
import SelectionMenu from '../components/SelectionMenu.vue'
import {onBeforeMount, onMounted, reactive, watch} from "vue"
import TrailerCardsContainer from "./TrailerCardsContainer.vue"
import TrailerCard from "./TrailerCard.vue"
import TrailerQuickPreview from "./TrailerQuickView.vue"

const state = reactive({
  filters: [
    'On TV',
    'In Theaters',
  ],
  activeFilter: 0,
  trailers: [],
  loading: true,
  viewPlayer: false,
  selectedTrailer: {},
})

const fetchType = (filter) => {
  if (filter === 'On TV') {
    return axios.get('movie/upcoming')
  }
  if (filter === 'In Theaters') {
    return axios.get('movie/upcoming')
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
  fetchTrailers(state.filters[state.activeFilter])
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

const playTrailer = (trailer) => {
  state.selectedTrailer = trailer
  state.viewPlayer = true
}
</script>

<template>
  <div class="latest-trailers-container">
    <div class="latest-trailers-wrapper">
      <div class="latest-trailers-content">
        <div class="latest-trailers-header">
          <h2 class="title">{{ 'Latest Trailers' }}</h2>
          <div class="latest-trailers-filter">
            <selection-menu :options="state.filters"
                            :active="state.activeFilter"
                            :border-color="'border-teal-500'"
                            :text-color="'text-white'"
                            :active-bg-color="'bg-gradient-to-r from-teal-300 to-teal-600'"
                            :active-text-color="'text-gray-800'"
                            @clicked="setSelectedFilter"/>
          </div>
        </div>
        <TrailerCardsContainer :loading="state.loading">
          <TrailerCard v-for="(item, index) in state.trailers" :key="index" :movie="item" @playTrailer="playTrailer"/>
        </TrailerCardsContainer>
      </div>
    </div>
    <TrailerQuickPreview :trailer="state.selectedTrailer" :open="state.viewPlayer" @close="()=>state.viewPlayer=false" v-if="state.viewPlayer"/>
  </div>
</template>

<style lang="scss" scoped>
.latest-trailers-container {
  @apply flex flex-row items-center justify-between w-full h-fit bg-no-repeat bg-cover bg-top;
  background-image: url('https://image.tmdb.org/t/p/w1920_and_h427_multi_faces/r7zUXadc1saFFSWz8lbUx7q9bkG.jpg');

  .latest-trailers-wrapper {
    @apply grow flex flex-col justify-center pt-4 sm:pt-8 w-full bg-[#032541] bg-opacity-75;

    .latest-trailers-content {
      @apply flex flex-col items-start justify-center w-full h-fit;

      .latest-trailers-header {
        @apply flex flex-row items-center justify-start px-6 sm:px-12 w-full;

        .title {
          @apply text-xl font-medium text-white;
        }

        .latest-trailers-filter {
          @apply flex flex-row ml-5;
        }
      }
    }
  }
}
</style>