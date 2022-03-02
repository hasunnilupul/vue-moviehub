import {createApp} from 'vue'
import {createPinia} from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

/**
 * Create Axios instance
 */
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmVkZWU3Y2JjZWVmZGNkZWQ2ZjljZjI4Y2UwYjBmMyIsInN1YiI6IjYyMWUwNTM4OTAyMDEyMDAxYmNjZjRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J2lksxo24mrSShMkuW2_JMFFsQUyK8xQ_0t6I9pdxOE'
window.axios = axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`

import './assets/scss/base.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
