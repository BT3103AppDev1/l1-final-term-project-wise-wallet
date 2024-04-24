<script>
import productOfferings from '@/components/ProductOfferingsBefore.vue'
import NavBar from '@/components/NavigationBar.vue'
export default{
    name:'product-offerings-before',
    components:{
        NavBar,
        productOfferings
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <productOfferings/>
    </main>
</template>