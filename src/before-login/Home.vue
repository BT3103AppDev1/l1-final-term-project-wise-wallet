<script>
import LandingPage from '@/components/LandingPage.vue'
import NavBar from '@/components/NavigationBar.vue'
export default{
    name:'App',
    components:{
        NavBar,
        LandingPage
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <LandingPage/>
    </main>
</template>