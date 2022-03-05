<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="trailer-cards-container scrollbar-x">
    <div class="trailer-cards-container-wrapper" :class="{loading: loading}">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trailer-cards-container {
  @apply flex flex-row items-center max-w-full py-5 overflow-x-auto;

  .trailer-cards-container-wrapper {
    @apply flex flex-row items-start space-x-5 transition-all filter;
  }

  .loading {
    @apply animate-pulse;
  }
}
</style>