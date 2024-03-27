<script>
import MyExpensesPage from '@/components/MyExpensesPage.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'my-expenses',
    components:{
        NavBar,
        MyExpensesPage
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <MyExpensesPage/>
    </main>
</template>