<script setup>
import VLazyImage from 'v-lazy-image'
import {getBackdropUrl, getPosterUrl} from "../util/ImageUrlGenerator"
import {onMounted, reactive, ref, watch} from "vue"
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import {PlayIcon} from '@heroicons/vue/solid'
import CircularProgress from "./CircularProgress.vue"
import TrailerQuickView from "./TrailerQuickView.vue"
import {getTrailerData} from "../util/TrailerConfigGenerator";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: {}
  },
})

const state = reactive({
  viewPlayer: false,
  trailer: {},
})
const movieHeaderBackground = ref(null)
dayjs.extend(duration)

const setBackdrop = (url) => {
  if (url && movieHeaderBackground.value) {
    movieHeaderBackground.value.style.backgroundImage = `url(${url})`
  }
}

onMounted(() => {
  setBackdrop(getBackdropUrl(props.movie.backdrop_path))
})

watch(() => state.trailer, (newVal) => {
  state.trailer = getTrailerData(newVal)
})

const playTrailer = (movieId) => {
  axios.get(`movie/${movieId}/videos`)
      .then(({data}) => {
        state.viewPlayer = true
        if (data.results.length > 0) {
          data.results.every(item => {
            if (item.type === 'Trailer' && item.official) {
              state.trailer = item
              return false;
            }
            return true;
          })
        }
      }).catch(error => {
        console.log(error)
      })
}
</script>

<template>
  <div class="movie-header-container" v-if="movie" ref="movieHeaderBackground">
    <div class="movie-header-wrapper">
      <div class="movie-header-poster-container">
        <v-lazy-image class="movie-header-poster-image" :src="getPosterUrl(movie.poster_path)"
                      src-placeholder="/src/assets/img/default-placeholder.png" alt="poster"/>
      </div>
      <div class="movie-header-info-container">
        <div class="movie-header-info-wrapper">
          <div class="movie-header-info-title-container">
            <div class="movie-header-info-title-wrapper">
              <h1>{{ movie.title }}</h1>
              <span>({{ movie.release_date.substring(0, 4) }})</span>
            </div>
            <div class="facts">
              <span class="release">
                {{ movie.release_date }}
              </span>
              <span class="genres">
                <router-link class="genre-link" v-for="(genre, index) in movie.genres" :key="index"
                             :to="`/genres/${genre.id}/${genre.name}`">
                  {{ genre.name }}
                </router-link>
              </span>
              <span class="runtime">
                {{ dayjs.duration(movie.runtime, 'minutes').format('H[h] m[m]') }}
              </span>
            </div>
          </div>
          <ul class="movie-header-info-actions-container">
            <li class="user-score">
              <div class="vote-container">
                <circular-progress :progress="movie.vote_average*10" :hole-size="60"
                                   :custom-class="'text-lg font-bold text-white'"/>
              </div>
            </li>
            <li class="play-trailer" @click="playTrailer(movie.id)">
              <play-icon class="play-icon"/>
              <p>Play Trailer</p>
            </li>
          </ul>
          <div class="movie-header-info-details-container">
            <h3 class="tagline">{{ movie.tagline }}</h3>
            <h3 class="overview-title">{{ 'Overview' }}</h3>
            <div class="overview">
              <p>{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TrailerQuickView :trailer="state.trailer" :open="state.viewPlayer" @close="()=>state.viewPlayer=false"
                      v-if="state.viewPlayer"/>
  </div>
</template>

<style lang="scss" scoped>
.movie-header-container {
  @apply flex flex-row h-[83vh] sm:h-[77vh] bg-cover bg-no-repeat bg-right-top;

  .movie-header-wrapper {
    @apply flex flex-row items-start px-10 py-8 h-full w-full bg-gradient-to-r from-[#350a0a] to-[#350a0ad6];

    .movie-header-poster-container {
      @apply flex flex-row shrink-0 grow-0 h-full;

      .movie-header-poster-image {
        @apply w-72 h-full rounded-md;
      }

      .v-lazy-image {
        @apply blur-md transition-all filter duration-700;
      }

      .v-lazy-image-loaded {
        @apply blur-0;
      }
    }

    .movie-header-info-container {
      @apply flex flex-row items-center justify-start grow h-full sm:pl-10;

      .movie-header-info-wrapper {
        @apply flex flex-col items-start justify-center w-full h-full;

        .movie-header-info-title-container {
          @apply flex flex-col items-start mb-6 w-full h-fit;

          .movie-header-info-title-wrapper {
            @apply flex flex-row items-center justify-start w-full h-fit;

            h1 {
              @apply text-3xl font-bold text-white;
            }

            span {
              @apply ml-1.5 text-3xl font-normal text-gray-200;
            }
          }

          .facts {
            @apply flex flex-row items-center justify-start w-full h-fit text-white text-sm font-light;

            .genres, .runtime {
              @apply relative flex flex-row flex-wrap items-center justify-start pl-5 w-fit h-fit;

              &:before {
                content: '\2022';
                @apply absolute left-2;
              }

              .genre-link {
                @apply ml-0.5 first:ml-0;

                &:after {
                  content: ',';
                }

                &:last-child:after {
                  content: '';
                }
              }
            }
          }
        }

        .movie-header-info-actions-container {
          @apply flex flex-row items-center justify-start mb-4 w-full h-fit;

          li {
            @apply flex flex-row items-center justify-center mr-5 last:mr-0 w-max text-white text-sm font-medium;
          }

          .user-score {
            .vote-container {
              @apply flex items-start justify-end p-1 w-16 h-16 rounded-full bg-[#081c22];
            }
          }

          .play-trailer {
            @apply text-white hover:text-gray-300 cursor-pointer;

            .play-icon {
              @apply mr-1.5 w-6 h-6;
            }
          }
        }

        .movie-header-info-details-container {
          @apply flex flex-col items-start justify-center w-full h-fit;

          .tagline {
            @apply text-base font-medium italic text-gray-300 text-opacity-80;
          }

          .overview-title {
            @apply my-2.5 text-lg font-medium text-white;
          }

          .overview {
            @apply text-sm font-light text-white;
          }
        }
      }
    }
  }
}
</style>