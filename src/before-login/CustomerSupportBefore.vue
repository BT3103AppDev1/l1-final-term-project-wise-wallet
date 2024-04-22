<script>
import CustomerSupport from '@/components/CustomerSupportPage.vue'
import NavBar from '@/components/NavigationBar.vue'

export default {
  name: 'CustomerSupportBefore',
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