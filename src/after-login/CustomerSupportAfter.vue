<script>
import CustomerSupport from '@/components/CustomerSupportPage.vue'
import NavBar from '@/components/LoginNavBar.vue'

export default {
  name: 'CustomerSupportAfter',
  components: {
    NavBar,
    CustomerSupport
  }
}
</script>

<template>
  <main>
    <NavBar />
    <CustomerSupport />
  </main>
</template>