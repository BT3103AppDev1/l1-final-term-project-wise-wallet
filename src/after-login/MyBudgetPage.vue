<script>
import MyBudgetPage from '@/components/MyBudgetPage.vue'
import NavBar from '@/components/LoginNavBar.vue'

export default{
    name:'myBudgetPage',
    components:{
        NavBar,
        MyBudgetPage
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <MyBudgetPage/>
    </main>
</template>