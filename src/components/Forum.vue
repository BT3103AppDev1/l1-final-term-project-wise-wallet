<template>
  <div class="forum-container">
    <NavBar />
    <div class="content-container">
      <!-- Posts Section -->
      <div class="posts-section">
        <!-- Search and Create Post Bar -->
        <div class="search-create-bar">
          <input type="text" placeholder="Search" class="search-input"/>
          <button class="create-post-btn" @click="navigateToCreatePost">Create Post</button>
        </div>

        <!-- Dynamic Articles -->
        <div class="article" v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <img v-if="post.coverPhoto" :src="post.coverPhoto" class="post-image"/>
          <p>{{ post.content }}</p>
        </div>
      </div>

      <!-- Sidebar Section -->
      <div class="sidebar-section">
        <!-- Sidebar Buttons -->
        <div class="sidebar-buttons">
          <button class="sidebar-btn">Newest and Recent</button>
          <button class="sidebar-btn">Popular of the day</button>
          <button class="sidebar-btn">Following</button>
        </div>

        <!-- Popular Tags -->
        <div class="tags-section">
          <h3>Popular Tags</h3>
          <div class="tags">
            <button class="tag-btn" v-for="tag in tags" :key="tag">#{{ tag }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onValue, ref } from 'firebase/database';
import { db, auth } from '@/assets/firebase.js';
import { useRouter } from 'vue-router';

export default {
  name: 'Forum',
  data() {
    return {
      posts: [],
      tags: ['fintech', 'bitcoin', 'stocks', 'budgeting', 'tutorial', 'business']
    };
  },
  setup() {
    const router = useRouter();

    const navigateToCreatePost = () => {
      router.push({ name: 'create-post' });
    };

    return { navigateToCreatePost };
  },
  mounted() {
    const postsRef = ref(db, 'users/' + auth.currentUser.uid + '/posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      this.posts = [];
      for (let id in data) {
        this.posts.push({ id, ...data[id] });
      }
    }, {
      onlyOnce: false
    });
  },
};
</script>

<style scoped>
.forum-container {
  display: flex;
  flex-direction: column;
  background: white;
  margin-left: 300px; /* Same as sidebar width */
  margin-top: 90px; /* Adjust for top navbar height */
}

.content-container {
  display: flex;
  height: calc(100vh - 90px); /* Adjust height accounting for navbar */
}

.posts-section {
  flex: 0 0 75%;
  padding: 20px;
  background: #ccc; 
}

.sidebar-section {
  flex: 0 0 25%;
  padding: 20px;
  background: #ccc;
  display: flex;
  flex-direction: column;
}

.search-create-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.create-post-btn, .sidebar-btn, .tag-btn {
  padding: 10px 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #E4E7F0;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.create-post-btn:hover, .sidebar-btn:hover, .tag-btn:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  color: white;
  transform: scale(1.05);
}

.article {
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-buttons {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.button-group {
  background: #bbb; 
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  flex: 1 0 33%; 
}

.tags-section {
  background: #bbb; 
  padding: 20px;
  border-radius: 10px;
  flex: 2 0 67%; 
}

.tags {
  display: flex;
  flex-direction: column;
}

.tag-btn {
  margin-bottom: 10px;
  background-color: #E4E7F0;
  transition: background-color 0.3s, transform 0.3s;
}

.tag-btn:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  color: white;
  transform: scale(1.05);
}
</style>
