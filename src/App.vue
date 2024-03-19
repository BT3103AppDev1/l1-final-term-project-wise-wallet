<script setup>
import LandingPage from './components/LandingPage.vue'
import NavigationBar from './components/NavigationBar.vue'
import LoginNavBar from './components/LoginNavBar.vue'
import RegistrationPage from './components/RegistrationPage.vue'
import LoginPage from './components/LoginPage.vue'
import DashBoard from './components/DashBoard.vue'
import ProfilePage from './components/ProfilePage.vue'
import CustomerSupportPage from './components/CustomerSupportPage.vue'
import BudgetManagement from './components/BudgetManagement.vue'
import PlannedPayment from './components/PlannedPayment.vue'
</script>

<template>
  <LoginNavBar/>
  <LandingPage/>
  <RegistrationPage/>
  <LoginPage/>
  <ProfilePage/>
  <CustomerSupportPage/>
  <PlannedPayment/>
  <BudgetManagement/>
  <DashBoard/>
</template>
