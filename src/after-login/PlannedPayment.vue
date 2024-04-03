<script>
import PlannedPayments from '@/components/PlannedPayment.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'plannedpayments',
    components:{
        NavBar,
        PlannedPayments
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <PlannedPayments/>
    </main>
</template>