<script>
import NavBar from '@/components/NavigationBar.vue'
import FAQ from '@/components/CustomerSupportPage.vue'
export default{
    name:'faq-page',
    components:{
        NavBar,
        FAQ
    }
}
</script>
<template>
    <NavBar/>
    <FAQ/>
</template>