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
          <div class="title">{{ post.title }}</div>
          <div class="content">
            <div class="top-row">
              <div v-if="post.hashtags && post.hashtags.length" class="hashtags">
                <span v-for="tag in post.hashtags" :key="tag" class="hashtag">{{ tag }}</span>
              </div>
            </div>
            <div class="main-row">
              <div v-if="post.coverPhoto" class="cover-photo-container">
                <img :src="post.coverPhoto" class="cover-photo"/>
              </div>
              <div class="blog-content" v-html="post.content"></div>
            </div>
          </div>
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
            <div v-for="tagInfo in trendingTags" :key="tagInfo.tag" class="tag-container">
              <button class="tag-btn">{{ tagInfo.tag }}</button>
              <span class="article-count">{{ tagInfo.postCount }} articles with this hashtag!</span>
            </div>
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
      trendingTags: []
    };
  },
  methods: {
    navigateToCreatePost() {
      this.$router.push({ name: 'create-post' });
    },
    fetchPosts() {
      const postsRef = ref(db, 'posts');  // Fetching from the common posts node
      onValue(postsRef, (snapshot) => {
        const postsArray = [];
        snapshot.forEach(childSnapshot => {
          let post = childSnapshot.val();
          post.id = childSnapshot.key; // Store the Firebase key as part of the post object
          postsArray.push(post);
        });
        this.posts = postsArray;
        this.updateTagsAndSort();
      }, {
        onlyOnce: false
      });
    },
    updateTagsAndSort() {
      const allTags = {};
      const postCountPerTag = {};
      // Sorting posts by createdAt date
      this.posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      
      this.posts.forEach(post => {
        if (post.hashtags) {
          post.hashtags.forEach(tag => {
            if (allTags[tag]) {
              allTags[tag]++;
            } else {
              allTags[tag] = 1;
            }
            if (!postCountPerTag[tag]) {
              postCountPerTag[tag] = new Set();
            }
            postCountPerTag[tag].add(post.id);
          });
        }
      });
      this.trendingTags = Object.entries(allTags)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5)
                                .map(([tag, count]) => {
                                  return {
                                    tag: tag,
                                    count: count,
                                    postCount: postCountPerTag[tag].size
                                  };
                                });
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
.forum-container {
  display: flex;
  flex-direction: column;
  background: white;
  margin-left: 300px; /* Same as sidebar width */
  margin-top: 90px; /* Adjust for top navbar height */
  ::-webkit-scrollbar {
    display: none;
  }
}

.content-container {
  display: flex;
  height: calc(100vh - 90px); /* Adjust height accounting for navbar */
}

.posts-section {
  flex: 0 0 70%; /* Set a fixed width for the posts section */
  max-width: 70%;
  overflow-x: hidden; /* Hide horizontal overflow */
  padding: 20px;
  background: #ccc;
}

.sidebar-section {
  flex: 0 0 30%; /* Set a fixed width for the sidebar */
  max-width: 30%;
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
  display: flex; /* Use flexbox for layout */
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article img {
  max-width: 200px; /* Set a max-width for the image */
  max-height: 150px; /* Set a max-height for the image */
  margin-right: 20px; /* Add some space between the image and content */
  border-radius: 5px; /* Optional: Add border-radius to the image */
}

.article p {
  flex: 1; /* Let the content take up the remaining space */
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.hashtags {
  margin-bottom: 10px;
}

.hashtag {
  margin-right: 5px;
  padding: 2px 5px;
  background-color: #E4E7F0;
  border-radius: 5px;
}

.cover-photo-container {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.cover-photo {
  max-width: 100%;
  border-radius: 5px;
}

.blog-content {
  overflow: hidden;
  /* Clear the float to prevent layout issues */
}

.main-row {
  overflow: hidden;
  /* Clear the float to prevent layout issues */
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
  overflow-y: auto; /* Allow vertical scrolling for tags */
  max-height: calc(100vh - 210px); /* Set a maximum height for the tags section */
}

.tag-btn {
  margin-bottom: 5px;
  background-color: #E4E7F0;
  border: none;
  border-radius: 15px;
  padding: 8px; /* Adjust padding */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.tag-btn:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  color: white;
  transform: scale(1.05);
}

.tag-container {
  background-color: #E4E7F0;
  padding: 8px; /* Adjust padding */
  margin-bottom: 5px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
}

.article-count {
  margin-left: 10px;
  font-size: 0.9em;
  color: #333;
}
</style>