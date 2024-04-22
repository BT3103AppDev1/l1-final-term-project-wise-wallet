<script>
import changePassword from '@/components/ChangePassword.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'change-password',
    components:{
        NavBar,
        changePassword
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <changePassword/>
    </main>
</template>