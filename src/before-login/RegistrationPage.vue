<script>
import NavBar from '@/components/NavigationBar.vue'
import Registration from '@/components/RegistrationPage.vue'
export default{
    name:'registration-page',
    components:{
        NavBar,
        Registration
    }
}
</script>
<template>
    <NavBar/>
    <Registration/>
</template>