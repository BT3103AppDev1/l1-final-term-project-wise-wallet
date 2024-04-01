import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/before-login/Home.vue'
import Login from '@/before-login/LoginPage.vue'
import Registration from '@/before-login/RegistrationPage.vue'
import FAQ from '@/before-login/FAQ.vue'
import resetPassword from '@/before-login/ForgetPassword.vue'

import Dashboard from '@/after-login/Dashboard.vue'
import profilePage from '@/after-login/ProfilePage.vue'
import myBudget from '@/after-login/BudgetManagementPage.vue'
import myExpenses from '@/after-login/MyExpensesPage.vue'
import ForumPage from '@/after-login/ForumPage.vue'
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
},
{
    path:'/myBudget',
    name:'my-budget',
    component:myBudget
},
{
    path:'/myProfile',
    name:'profile-page',
    component:profilePage
},
{
    path:'/myExpenses',
    name:'my-Expenses',
    component:myExpenses
},
{
    path: '/forum',
    name: 'forum-page',
    component: ForumPage
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router
