<script>
import BudgetManagementPage from '@/components/BudgetManagement.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'my-budget',
    components:{
        NavBar,
        BudgetManagementPage
    },
    data() {
        return {
            isBudgetNegative: false
        };
    },
    methods: {
        updateBudgetStatus(status) {
            this.isBudgetNegative = status;
        }
    }
}
</script>
<template>
    <main>
        <NavBar :isBudgetNegative="isBudgetNegative"/>
        <BudgetManagementPage @budget-status-updated="updateBudgetStatus"/>
    </main>
</template>