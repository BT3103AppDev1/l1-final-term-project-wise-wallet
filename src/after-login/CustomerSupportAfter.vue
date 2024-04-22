<script>
import CustomerSupportPageAfter from '@/components/CustomerSupportPageAfter.vue'
import NavBar from '@/components/LoginNavBar.vue'

export default {
  name: 'CustomerSupportAfterPage',
  components: {
    NavBar,
    CustomerSupportPageAfter
  }
}
</script>

<template>
  <main>
    <NavBar />
    <CustomerSupportPageAfter />
  </main>
</template>