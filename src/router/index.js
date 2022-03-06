import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie/:id/:title',
      name: 'Movie',
      component: () => import('../views/Movie.vue')
    },
    {
      path: '/tv/:id/:title',
      name: 'TvShow',
      component: () => import('../views/TvShow.vue')
    }
  ]
})

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router
