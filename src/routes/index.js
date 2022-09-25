import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
  // hash
  // https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  // https://google.com/
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    }
  ]
})