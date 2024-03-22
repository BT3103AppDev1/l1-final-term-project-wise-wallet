<script>
import BudgetManagementPage from '@/components/BudgetManagement.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'my-budget',
    components:{
        NavBar,
        BudgetManagementPage
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <BudgetManagementPage/>
    </main>
</template>