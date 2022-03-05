<script setup>
import {ref} from 'vue'
import {
  Dialog,
  DialogOverlay,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {XIcon} from '@heroicons/vue/outline'
import {StarIcon} from '@heroicons/vue/solid'

defineEmits(['close'])
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  trailer: {
    type: Object,
    required: true,
  },
})
const product = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    {name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400'},
    {name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400'},
    {name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900'},
  ],
  sizes: [
    {name: 'XXS', inStock: true},
    {name: 'XS', inStock: true},
    {name: 'S', inStock: true},
    {name: 'M', inStock: true},
    {name: 'L', inStock: true},
    {name: 'XL', inStock: true},
    {name: 'XXL', inStock: true},
    {name: 'XXXL', inStock: false},
  ],
}
const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="$emit('close')">
      <div class="flex min-h-screen text-center md:block md:px-2 lg:px-4" style="font-size: 0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"/>
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden md:inline-block md:align-middle md:min-h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300"
                         enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                         enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
                         leave-from="opacity-100 translate-y-0 md:scale-100"
                         leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
          <div
              class="flex text-base text-left transform transition w-full md:inline-block max-w-screen-sm md:max-w-screen-md md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
            <div
                class="w-full relative flex items-center bg-black overflow-hidden shadow-2xl">
              <button type="button"
                      class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-4 sm:right-3 md:top-3 md:right-3 lg:top-4 lg:right-4"
                      @click="$emit('close')">
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true"/>
              </button>

              <div class="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                <div class="col-span-12">
                  <h2 class="text-lg font-normal text-white sm:pr-12 px-3 pt-2 pb-2 sm:px-3 sm:pt-4 md:p-3 lg:p-4">
                    {{ trailer.name }}
                  </h2>

                  <section aria-labelledby="video-player">
                    <iframe type="text/html" class="w-full h-[30vh] sm:h-[40vh] lg:h-[65vh]" :src="trailer.embeded_url" :title="trailer.name" style="background-color: #000" allowfullscreen>
                    </iframe>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>