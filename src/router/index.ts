import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import BoardView from '@/views/BoardView.vue'
import { isLoggedIn } from '@/mockup/authStorage'

const routes = [
    { path: '/login', component: LoginView},
    { path: '/register', component: RegisterView},
    {path: '/board',component: BoardView,meta: { requiresAuth: true },},
    { path: '/', redirect: '/login'},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login') 
  } else {
    next()
  }
})

export default router