import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Testing from '../views/Testing.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import WishlistView from '../views/WishlistView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'HomeView',
      component: HomeView

    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/wishlist',
      name: 'WishlistView',
      component: WishlistView
    },
    {
      path: '/pub/products/:id',
      name: 'ProductDetailView',
      component: ProductDetailView
    }
    
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }, 
    // {
    //   path: '/',
    //   name: 'testing',
    //   component: Testing
    // }
  ]  
})
router.beforeEach((to, from) => {
    let access_token = localStorage.getItem('access_token')
    if (access_token && to.name == 'LoginView') {
      return { path : '/'}
    } else if (access_token && to.name == 'Registerview') {
      return { path: '/'}
    }
})

export default router
