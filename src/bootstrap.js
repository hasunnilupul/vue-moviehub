import axios from "axios"
import 'nprogress/nprogress.css'
import NProgress from "nprogress";

/**
 * Create Axios instance
 */
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmVkZWU3Y2JjZWVmZGNkZWQ2ZjljZjI4Y2UwYjBmMyIsInN1YiI6IjYyMWUwNTM4OTAyMDEyMDAxYmNjZjRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J2lksxo24mrSShMkuW2_JMFFsQUyK8xQ_0t6I9pdxOE'
window.axios = axios
/** Set Axios base URL */
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
/** Set Authorization token */
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`

/**
 * Configure NProgress
 */
window.nprogress = NProgress;
nprogress.configure({ showSpinner: false });