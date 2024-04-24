<script>
import cancelWiseWallet from '@/components/CancelSubscription.vue'
import NavBar from '@/components/NavigationBar.vue'
export default{
    name:'cancel-wisewallet-before',
    components:{
        NavBar,
        cancelWiseWallet
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <cancelWiseWallet/>
    </main>
</template>