<script setup>
import MovieNavigation from "../components/MovieNavigation.vue"
import MovieHeader from "../components/MovieHeader.vue"
import {onBeforeMount, reactive, watch} from "vue"
import {useRoute} from "vue-router"

const navigationList = [
  {
    name: 'Overview',
    options: [
      {name: 'Main', path: ''},
      {name: 'Alternative Titles', path: '/titles'},
      {name: 'Cast & Crew', path: '/cast'},
      {name: 'Release Dates', path: '/releases'},
      {name: 'Translations', path: '/translations'},
    ]
  },
  {
    name: 'Media',
    options: [
      {name: 'Backdrops', path: '/images/backdrops'},
      {name: 'Logos', path: '/images/logos'},
      {name: 'Posters', path: '/images/posters'},
      {name: 'Videos', path: '/videos'},
    ]
  },
  {
    name: 'Fandom',
    options: [
      {name: 'Reviews', path: '/reviews'},
    ]
  },
  {
    name: 'Share',
    options: [
      {
        name: 'Share Link', path: '#', onClick: () => {
        }
      },
      {name: 'Facebook', path: '#'},
      {name: 'Tweet', path: '#'},
    ]
  }
]
const movieId = useRoute().params.id
const state = reactive({
  movie: null,
})

const fetchMovieDetails = async (movie_id) => {
  const {data} = await axios.get(`movie/${movie_id}`).catch(error => {
    console.log(error)
  })
  state.movie = await data
}

onBeforeMount(() => {
  fetchMovieDetails(movieId);
})

watch(() => movieId, () => {
  fetchMovieDetails(movieId);
})
</script>

<template>
  <div class="movie" v-if="state.movie">
    <movie-navigation :navigation="navigationList"/>
    <movie-header :movie="state.movie"/>
  </div>
</template>

<style scoped>

</style>