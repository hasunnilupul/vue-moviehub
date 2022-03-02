<template>
  <div class="movie-cards-container scrollbar-x">
    <div class="movie-cards-container-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-cards-container {
  @apply flex flex-row items-center max-w-full pt-5 pb-2 overflow-x-auto;

  .movie-cards-container-wrapper {
    @apply flex flex-row items-start space-x-5;
  }
}
</style>