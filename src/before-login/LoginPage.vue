<script>
import NavBar from '@/components/NavigationBar.vue'
import LoginPage from '@/components/LoginPage.vue'
export default{
    name:'login-page',
    components:{
        NavBar,
        LoginPage
    }
}
</script>
<template>
    <NavBar/>
    <LoginPage/>
</template>