<script>
import CreatePostForm from '@/components/CreatePostForm.vue'
import NavBar from '@/components/LoginNavBar.vue'

export default {
  name: 'CreatePostPage',
  components: {
    NavBar,
    CreatePostForm
  }
}
</script>

<template>
  <main>
    <NavBar />
    <CreatePostForm />
  </main>
</template>