<script setup>
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <Menu as="div" class="ml-3 relative">
      <div>
        <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
          <span class="sr-only">Open user menu</span>
          <img class="h-8 w-8 rounded-full" :src="user.avatar || 'https://source.unsplash.com/random/256x256?teen&boy'" alt="" />
        </MenuButton>
      </div>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem v-slot="{ active }">
            <router-link to="/login" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Login</router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <router-link to="/register" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Register</router-link>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>