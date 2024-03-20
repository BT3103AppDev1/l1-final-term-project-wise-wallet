<script>
import ForgetPassword from '@/components/ForgetPasswordPage.vue'
import NavBar from '@/components/NavigationBar.vue'
export default{
    name:'reset-password',
    components:{
        NavBar,
        ForgetPassword
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <ForgetPassword/>
    </main>
</template>