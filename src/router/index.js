import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/before-login/Home.vue'
import Login from '@/before-login/LoginPage.vue'
import Registration from '@/before-login/RegistrationPage.vue'
import resetPassword from '@/before-login/ForgetPassword.vue'
import CustomerSupportBefore from '@/before-login/CustomerSupportBefore.vue'

import Dashboard from '@/after-login/Dashboard.vue'
import profilePage from '@/after-login/ProfilePage.vue'
import changePassword from '@/after-login/ChangePasswordPage.vue'
import budgetManagement from '@/after-login/BudgetManagementPage.vue'
import plannedPayments from '@/after-login/PlannedPayment.vue'
import myExpenses from '@/after-login/MyExpensesPage.vue'
import ForumPage from '@/after-login/ForumPage.vue'
import MyBudgetPage from '@/after-login/MyBudgetPage.vue'
import CreatePostPage from '@/after-login/CreatePostPage.vue'
import CustomerSupportAfter from '@/after-login/CustomerSupportAfter.vue'

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
    name:'myBudgetPage',
    component:MyBudgetPage
},
{
    path:'/budgetmanagement',
    name:'budgetmanagement',
    component:budgetManagement

},
{
    path: '/plannedpayments',
    name: 'plannedpayments',
    component: plannedPayments
},
{
    path:'/myProfile',
    name:'profile-page',
    component:profilePage
},
{
    path:'/changePassword',
    name:'change-password',
    component:changePassword
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
},
{
    path: '/create-post',
    name: 'create-post',
    component: CreatePostPage
},
{
    path: '/customer-support-after',
    name: 'customer-support-after',
    component: CustomerSupportAfter
},
{
    path: '/customer-support-before',
    name: 'customer-support-before',
    component: CustomerSupportBefore
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router
