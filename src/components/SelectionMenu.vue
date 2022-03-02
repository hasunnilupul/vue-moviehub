<script setup>
defineEmits(['clicked'])
defineProps({
  options: {
    type: Array,
    required: true
  },
  active: {
    type: Number,
    required: true
  },
})
</script>

<template>
  <div class="selection-menu-container">
    <button class="menu-item" v-for="(option, index) in options" :key="index" :class="[active===index?'active':'']"
            @click="$emit('clicked', index)">
      {{ option }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.selection-menu-container {
  @apply flex flex-row flex-wrap rounded-full border border-[#032541];

  .menu-item {
    @apply flex flex-row items-center justify-center px-3 py-2 h-7 rounded-full text-xs font-medium text-gray-800;
  }

  .active {
    @apply bg-[#032541] text-white;
  }
}
</style>