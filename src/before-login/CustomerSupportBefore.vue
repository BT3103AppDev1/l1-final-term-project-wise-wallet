<script>
import CustomerSupportPageBefore from '@/components/CustomerSupportPageBefore.vue'
import NavBar from '@/components/NavigationBar.vue'

export default {
  name: 'CustomerSupportBeforePage',
  components: {
    NavBar,
    CustomerSupportPageBefore
  }
}
</script>

<template>
  <main>
    <NavBar />
    <CustomerSupportPageBefore />
  </main>
</template>