<script setup>
import VLazyImage from 'v-lazy-image'
import {PlayIcon} from '@heroicons/vue/solid'
import {onBeforeMount, reactive, watch} from "vue";

defineEmits(['onHover', 'playTrailer'])
const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  },
})

const state = reactive({
  trailer: {},
  loading: true,
})

const getPosterUrl = (poster_path) => {
  const movie_poster = poster_path ? `${api_configuration.images.secure_base_url}w500${poster_path}` : ''
  const trailer_poster = state.trailer.poster
  if (trailer_poster) {
    return trailer_poster
  }
  return movie_poster
}

onBeforeMount(() => {
  if (props.movie != null) {
    state.loading = true
    axios.get(`movie/${props.movie.id}/videos`)
        .then(({data}) => {
          if (data.results.length > 0) {
            data.results.every(item => {
              if (item.type === 'Trailer') {
                state.trailer = item
                return false;
              }
              return true;
            })
            state.loading = false
          }
        }).catch(error => {
      state.loading = false
      console.log(error)
    })
  }
})

watch(() => state.trailer, (newVal) => {
  if (newVal.key) {
    switch (newVal.site) {
      case 'YouTube':
        state.trailer.url = `https://www.youtube.com/watch?v=${newVal.key}`
        state.trailer.embeded_url = `https://www.youtube.com/embed/${newVal.key}`
        state.trailer.poster = `https://img.youtube.com/vi/${newVal.key}/hqdefault.jpg`
        break;
    }
  }
})
</script>

<template>
  <div class="trailer-card-container" @mouseover="$emit('onHover', getPosterUrl(movie.poster_path))" v-cloak>
    <button class="group trailer-card-image-container" @click="$emit('playTrailer', state.trailer)">
      <v-lazy-image class="trailer-card-image group-hover:scale-105 ease-in-out duration-200 delay-100"
                    src-placeholder="src/assets/img/default-placeholder.png" :src="getPosterUrl(movie.poster_path)"
                    alt="poster"/>
      <span class="trailer-card-play group-hover:scale-105 ease-in-out duration-200 delay-100">
        <play-icon class="icon group-hover:scale-105 ease-in-out duration-200 delay-100"/>
      </span>
    </button>
    <div class="trailer-card-info-container">
      <router-link :to="`/${type}/${movie.id}`" class="trailer-card-title">
        {{ movie.title || movie.name }}
      </router-link>
      <div class="trailer-card-description">{{ state.trailer.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trailer-card-container {
  @apply flex flex-col shrink-0 items-start justify-between first:pl-5 first:sm:pl-10 last:pr-5 last:sm:pr-10;

  .trailer-card-image-container {
    @apply relative flex flex-col items-center justify-center shadow-sm;

    .trailer-card-image {
      @apply object-cover w-72 h-44 rounded-lg;
    }

    .v-lazy-image {
      @apply blur-md transition-all filter duration-700;
    }

    .v-lazy-image-loaded {
      @apply blur-0;
    }

    .trailer-card-play {
      @apply absolute inset-0 flex items-center justify-center w-72 h-44 rounded-lg bg-gray-500 bg-opacity-30;

      .icon {
        @apply w-12 h-12 text-white;
      }
    }
  }

  .trailer-card-info-container {
    @apply flex flex-col items-start justify-start pt-2;

    .trailer-card-title {
      @apply flex flex-wrap w-72 text-sm font-bold text-center line-clamp-1 text-white;
    }

    .trailer-card-description {
      @apply flex flex-wrap mt-1 w-72 text-xs font-normal text-center line-clamp-2 text-white;
    }
  }
}
</style>