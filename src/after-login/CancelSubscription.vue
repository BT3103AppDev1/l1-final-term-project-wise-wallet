<script>
import cancelWiseWallet from '@/components/CancelSubscription.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'cancel-wisewallet',
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