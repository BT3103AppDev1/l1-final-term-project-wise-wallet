<script>
import ForumPage from '@/components/Forum.vue'
import NavBar from '@/components/LoginNavBar.vue'

export default {
    name: 'forum-page',
    components: {
        NavBar,
        ForumPage
    }
}
</script>

<template>
    <main>
        <NavBar/>
        <ForumPage/>
    </main>
</template>
