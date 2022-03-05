<script setup>
defineEmits(['clicked'])
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  active: {
    type: Number,
    required: true
  },
  borderColor: {
    type: String,
    default: null
  },
  textColor: {
    type: String,
    default: null
  },
  activeBgColor: {
    type: String,
    default: null
  },
  activeTextColor: {
    type: String,
    default: null
  },
})

const activeClasses = []
if (props.activeBgColor) {
  activeClasses.push(props.activeBgColor)
} else {
  activeClasses.push('bg-[#032541]')
}
if (props.activeTextColor) {
  activeClasses.push(props.activeTextColor)
} else {
  activeClasses.push('text-white')
}
</script>

<template>
  <div class="selection-menu-container" :class="[borderColor? borderColor:'border-[#032541]']">
    <button class="menu-item" v-for="(option, index) in options" :key="index"
            :class="[active===index?activeClasses:(textColor? textColor:'text-gray-800')]"
            @click="$emit('clicked', index)">
      {{ option }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.selection-menu-container {
  @apply flex flex-row flex-wrap rounded-full border;

  .menu-item {
    @apply flex flex-row items-center justify-center px-3 py-2 h-7 rounded-full text-xs font-medium;
  }
}
</style>