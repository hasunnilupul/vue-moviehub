<script setup>
import CircularProgress from "./CircularProgress.vue"
import VLazyImage from 'v-lazy-image'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const getPosterUrl = (poster_path) => {
  return poster_path ? `${api_configuration.images.secure_base_url}w500${poster_path}` : ''
}
</script>

<template>
  <div class="movie-card-container">
    <router-link to="/" class="movie-card-image-container">
      <v-lazy-image class="movie-card-image" :src="getPosterUrl(movie.poster_path)" src-placeholder="src/assets/img/default-placeholder.png" alt="poster"/>
    </router-link>
    <div class="movie-card-info-container">
      <router-link to="/" class="movie-card-title">{{ movie.title || movie.name }}</router-link>
      <div class="movie-card-created">{{ movie.release_date || movie.first_air_date }}</div>
      <div class="movie-card-progress-container">
        <circular-progress :progress="movie.vote_average*10"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-card-container {
  @apply flex flex-col shrink-0 items-start justify-between first:pl-5 first:sm:pl-10 last:pr-5 last:sm:pr-10;

  .movie-card-image-container {
    @apply flex flex-col items-center justify-center;

    .movie-card-image {
      @apply object-cover w-36 h-56 rounded-lg;
    }

    .v-lazy-image {
      @apply blur-md transition-all filter duration-700;
    }

    .v-lazy-image-loaded {
      @apply blur-0;
    }
  }

  .movie-card-info-container {
    @apply relative flex flex-col items-start justify-start pt-7 pl-2;

    .movie-card-title {
      @apply flex flex-wrap w-32 max-h-16 text-sm font-bold line-clamp-2 text-gray-800 hover:text-sky-600 focus:text-sky-600;
    }

    .movie-card-created {
      @apply flex flex-wrap w-32 text-xs font-normal text-gray-600;
    }

    .movie-card-progress-container {
      @apply absolute -top-4 flex items-start justify-end w-10 h-10 rounded-full bg-[#081c22];
      padding: 2px;
    }
  }
}
</style>