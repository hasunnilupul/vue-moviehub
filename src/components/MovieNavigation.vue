<script setup>
defineProps({
  navigation: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="movie-navigation-container">
    <div class="movie-navigation-wrapper">
      <div class="group movie-navigation-item" v-for="(menu, index) in navigation" :key="index">
        <span>{{ menu.name }}</span>
        <div class="hidden group-hover:block navigation-item-list-container">
          <ul class="navigation-item-list-wrapper">
            <li class="navigation-item-list-item" v-for="(option, index) in menu.options" :key="index">
              <router-link :to="option.path" v-if="option.onClick==null">{{ option.name }}</router-link>
              <button @click="option.onClick()" v-else>{{ option.name }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-navigation-container {
  @apply flex flex-row justify-center items-center;

  .movie-navigation-wrapper {
    @apply flex flex-row justify-center items-center max-w-screen-sm sm:max-w-screen-md;

    .movie-navigation-item {
      @apply relative flex flex-row justify-center items-center mx-2 sm:mx-4 px-1 py-2.5 first:border-b-4 border-b-[#3dbec8] text-sm font-normal text-center text-gray-800 hover:text-gray-600 cursor-pointer;

      &:after {
        content: '';
        @apply w-0 h-0 ml-2 border-t-[6px] border-t-gray-800 border-l-4 border-l-transparent border-r-4 border-r-transparent;
      }

      .navigation-item-list-container {
        @apply absolute top-[40px] left-0;

        .navigation-item-list-wrapper {
          @apply absolute flex flex-col w-40 sm:w-48 h-fit bg-white z-30 rounded shadow-lg py-1 border border-gray-300;

          .navigation-item-list-item {
            @apply flex flex-row justify-start items-center pl-4 pr-5 py-1 text-sm font-normal text-gray-800 hover:bg-gray-100 cursor-pointer;

            a, button {
              @apply grow flex flex-row flex-wrap items-center justify-start;
            }
          }
        }
      }
    }
  }
}
</style>