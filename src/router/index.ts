import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import BoardView from '@/views/BoardView.vue'

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', component: LoginView},
    { path: '/register', component: RegisterView},
    { path: '/board', component: BoardView},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router