<script setup>
import {RouterLink} from 'vue-router'
import {SearchIcon, XIcon} from '@heroicons/vue/solid'
import ProfileDropdown from "./ProfileDropdown.vue"
import {reactive} from "vue";

const state = reactive({
  user: {
    name: 'Jane Doe',
    avatar: ''
  },
  search: false,
  searchQuery: '',
})

const toggleSearch = () => {
  state.search = !state.search
}
</script>

<template>
  <div>
    <header>
      <RouterLink :to="{name: 'Home'}" class="logo-container">
        <h1 class="title">TMH</h1>
        <span/>
      </RouterLink>
      <div class="nav-container">
        <nav class="nav">
          <RouterLink to="/movies" class="nav-item">Movies</RouterLink>
          <RouterLink to="/tv-shows" class="nav-item">TV Shows</RouterLink>
          <RouterLink to="/actors" class="nav-item">Actors</RouterLink>
        </nav>
      </div>
      <div class="menu-container">
        <div class="menu-item">
          <profile-dropdown :user="state.user"/>
        </div>
        <button class="menu-item" @click="toggleSearch()">
          <search-icon class="menu-icon" v-if="!state.search"/>
          <x-icon class="menu-icon light" v-else/>
        </button>
      </div>
    </header>
    <div class="search-container" v-if="state.search">
      <div class="search-input-container">
        <search-icon class="icon"/>
        <input type="text" v-model="state.searchQuery" class="search-input" placeholder="Search for a movie, tv show or actor..."/>
        <button @click="()=>state.searchQuery=''">
          <x-icon class="icon light"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  @apply bg-[#032541] h-16 flex items-center justify-between px-6 sm:px-12;

  .logo-container {
    @apply shrink-0 flex flex-row justify-between items-center;

    .title {
      @apply text-3xl font-bold text-teal-500;
    }

    span {
      @apply ml-1 w-16 h-5 rounded-full bg-gradient-to-r from-teal-500 to-blue-500;
    }
  }

  .nav-container {
    @apply grow hidden sm:flex flex-row justify-start items-center mx-3;
    .nav {
      @apply flex flex-row justify-between items-center;

      .nav-item {
        @apply text-sm font-medium text-white mx-3;
      }
    }
  }

  .menu-container {
    @apply flex flex-row justify-end items-center;

    .menu-item {
      @apply flex ml-5 first:ml-0;

      .menu-icon {
        @apply h-7 w-7 fill-current text-cyan-500;
      }

      .light {
        @apply text-white;
      }
    }
  }
}

.search-container {
  @apply absolute top-16 flex flex-col items-stretch justify-start border-b border-gray-200 w-full h-fit bg-white;

  .search-input-container{
    @apply flex flex-row items-center justify-between px-3 sm:px-8 py-2 sm:py-3;

    .icon{
      @apply h-5 w-5 fill-current text-gray-800;
    }

    .light{
      @apply text-gray-400;
    }

    input {
      @apply text-sm font-normal italic text-gray-700 w-full focus:outline-0 mx-2;
    }
  }
}
</style>