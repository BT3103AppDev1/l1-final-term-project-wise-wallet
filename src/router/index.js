import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/before-login/Home.vue'
import Login from '@/before-login/LoginPage.vue'
import Registration from '@/before-login/RegistrationPage.vue'
import FAQ from '@/before-login/FAQ.vue'
import resetPassword from '@/before-login/ForgetPassword.vue'

import Dashboard from '@/after-login/Dashboard.vue'
const routes = [
{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path:'/login',
    name:'login-page',
    component: Login
},
{
    path:'/registration',
    name:'registration-page',
    component: Registration    
},
{
    path:'/faq',
    name:'faq-page',
    component: FAQ
},
{
    path:'/dashboard',
    name:'dashboard',
    component:Dashboard    
},
{
    path:'/resetPassword',
    name:'reset-password',
    component:resetPassword
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router
