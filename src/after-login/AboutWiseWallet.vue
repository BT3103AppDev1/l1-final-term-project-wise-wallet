<script>
import aboutWiseWallet from '@/components/AboutWiseWallet.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'about-wisewallet',
    components:{
        NavBar,
        aboutWiseWallet
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <aboutWiseWallet/>
    </main>
</template>