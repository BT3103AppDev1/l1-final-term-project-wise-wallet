<script>
import productOfferings from '@/components/ProductOfferings.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'product-offerings',
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