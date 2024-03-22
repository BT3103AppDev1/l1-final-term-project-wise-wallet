<script>
import profilePage from '@/components/ProfilePage.vue'
import NavBar from '@/components/LoginNavBar.vue'
export default{
    name:'profile-page',
    components:{
        NavBar,
        profilePage
    }
}
</script>
<template>
    <main>
        <NavBar/>
        <profilePage/>
    </main>
</template>