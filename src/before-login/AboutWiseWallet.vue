<script>
import aboutWiseWallet from '@/components/AboutWiseWalletBefore.vue'
import NavBar from '@/components/NavigationBar.vue'
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