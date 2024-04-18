<script>
import Dashboard from '@/components/MyBudgetPage.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'dashboard',
    components:{
        NavBar,
        Dashboard
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <Dashboard/>
    </main>
</template>