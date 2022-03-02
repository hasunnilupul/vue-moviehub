<script setup>
import {RouterView} from 'vue-router'
import AppHeader from "./components/AppHeader.vue";
import {onBeforeMount} from "vue";

onBeforeMount(() => {
    axios.get('configuration').then(response => {
        window.api_configuration = response.data;
    });
});
</script>

<template>
  <app-header/>
  <main>
    <RouterView/>
  </main>
</template>