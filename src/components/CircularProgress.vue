<script setup>
import {onBeforeMount, reactive, watch} from "vue";

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
    required: true
  },
  holeSize: {
    type: Number,
    default: 62,
    required: false,
    description: "Lower the value bigger the track and Bigger the value lower the track."
  },
  customClass: {
    type: String,
    default: "text-xs font-bold text-white",
    required: false
  },
})

const state = reactive({
  trackColor: '#DDDEE4FF',
  trackBgColor: '#DDDEE4FF',
})

const progressStyles = (progress) => {
  if (progress <= 30) {
    state.trackColor = '#db2360'
    state.trackBgColor = '#571435'
  } else if (progress > 30 && progress <= 70) {
    state.trackColor = '#d2d531'
    state.trackBgColor = '#423d0f'
  } else if (progress > 70 && progress <= 100) {
    state.trackColor = '#21d07a'
    state.trackBgColor = '#204529'
  } else {
    state.trackColor = '#DDDEE4FF'
    state.trackBgColor = '#DDDEE4FF'
  }
}

onBeforeMount(() => {
  progressStyles(props.progress)
})

watch(() => props.progress, (newValue) => {
  progressStyles(newValue)
})
</script>

<template>
  <div
      :title="`rating: ${progress}%`"
      class="circular-progress"
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="{'--holesize': holeSize+'%', '--progress': progress+'%', '--track': state.trackColor,'--track-bg': state.trackBgColor}">
    <span class="progress-value" :class="customClass">{{ `${progress}%` }}</span>
  </div>
</template>

<style lang="scss" scoped>
.circular-progress {
  @apply relative grid place-items-center w-full h-full;

  &::before {
    @apply absolute inset-0 content-center rounded-full z-10;
    content: '';
    background: conic-gradient(
            var(--track),
            var(--track),
            var(--track) var(--progress, 0%),
            var(--track-bg) var(--progress, (0%)) 100%
    );

    mask-image: radial-gradient(
            transparent var(--holesize),
            #b21c1c calc(var(--holesize) + 0.5px)
    );
  }
}
</style>