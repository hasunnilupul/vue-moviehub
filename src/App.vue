<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
        <RouterLink to="/" class="text-base">Home</RouterLink>
        <RouterLink to="/about" class="text-base">About</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>