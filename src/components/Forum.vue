<template>
  <div class="forum-container">
    <!-- ...other components like NavBar... -->
    <div class="content-container">
      <div class="posts-section">
        <!-- ...Search and Create Post Bar... -->
        <div class="search-create-bar">
          <input type="text" placeholder="Search" class="search-input"/>
          <button class="create-post-btn" @click="navigateToCreatePost">Create Post</button>
        </div>
        <div class="article" v-for="post in posts" :key="post.id">
          <!-- Title on the top row -->
          <div class="title-container">{{ post.title }}<button v-if="post.userId === currentUserId" class="delete-post-btn" @click="confirmDelete(post.id)">Delete Post</button></div>

          <!-- Middle row with cover photo, hashtags, and blog content -->
          <div class="middle-row">
            <div class="cover-photo-container">
              <img v-if="post.coverPhoto" :src="post.coverPhoto" class="cover-photo"/>
              <div v-else class="no-cover-photo">No cover photo uploaded</div>
            </div>
            <div class="right-section">
              <div class="hashtags-container">{{ post.hashtags.join(' ') }}</div>
              <div class="blog-content">
                <p v-if="!post.expanded">{{ postIntro(post.content) }}</p>
                <div v-else v-html="post.content"></div>
                <button class="read-more-btn" @click="toggleReadMore(post)">{{ post.expanded ? 'Show Less' : 'Read More' }}</button>
              </div>
            </div>
          </div>

          <!-- Bottom row with comment section -->
          <div class="comment-section">
            <input type="text" placeholder="Write your comment here" v-model="post.newComment" class="comment-input"/>
            <div class="comment-buttons">
              <button @click="addComment(post)">Post Comment</button>
              <button @click="post.showComments = !post.showComments">
                View Comments ({{ post.comments.length }})
              </button>
            </div>
          </div>

          <!-- Expanded comments view -->
          <div v-if="post.showComments" class="comments-container">
            <div class="comment" v-for="comment in post.comments" :key="comment.id">
              {{ comment.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- Sidebar Section -->
      <div class="sidebar-section">
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
import { onValue, ref, push, set, child } from 'firebase/database';
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
      const postsRef = ref(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const postsArray = [];
        snapshot.forEach((childSnapshot) => {
          let post = childSnapshot.val();
          post.id = childSnapshot.key;
          post.expanded = false;
          post.showComments = false;
          post.comments = [];
          post.newComment = '';
          const commentsRef = child(ref(db), `comments/${post.id}`);
          onValue(commentsRef, (commentSnapshot) => {
            post.comments = commentSnapshot.val() ? Object.values(commentSnapshot.val()) : [];
          }, {
            onlyOnce: true
          });
          post.userId = childSnapshot.val().userId;
          postsArray.push(post);
        });
        this.posts = postsArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sorting by createdAt
        this.updateTagsAndSort();
      });
    },
    confirmDelete(postId) {
      if (window.confirm("Confirm delete post")) {
        this.deletePost(postId);
      }
    },
    deletePost(postId) {
      const postRef = ref(db, `posts/${postId}`);
      set(postRef, null).then(() => {
        this.fetchPosts(); // Refresh the list of posts after deletion
      }).catch(error => {
        console.error("Error deleting post: ", error);
      });
    },
    toggleReadMore(post) {
      post.expanded = !post.expanded;
    },
    addComment(post) {
      if (!post.newComment.trim()) {
        alert('Comment cannot be empty');
        return;
      }
      const newCommentRef = push(ref(db, `comments/${post.id}`));
      set(newCommentRef, {
        text: post.newComment.trim(),
        createdAt: new Date().toISOString(),
        userId: auth.currentUser.uid,
      }).then(() => {
        post.newComment = '';
        this.fetchPostComments(post.id);
      });
    },
    fetchPostComments(postId) {
      const commentsRef = ref(db, `comments/${postId}`);
      onValue(commentsRef, (snapshot) => {
        const postIndex = this.posts.findIndex((p) => p.id === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].comments = snapshot.val() ? Object.values(snapshot.val()) : [];
        }
      }, {
        onlyOnce: true
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
                                .slice(0, 8)
                                .map(([tag, count]) => {
                                  return {
                                    tag: tag,
                                    count: count,
                                    postCount: postCountPerTag[tag].size
                                  };
                                });
    },
    postIntro(content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const words = textContent.split(' ').slice(0, 50).join(' ');
      return words.length < textContent.length ? words + '...' : words;
    },
  },
  computed: {
  processedPosts() {
    return this.posts.map(post => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.content; 
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      const words = textContent.split(' ').slice(0, 50).join(' ');
      post.processedContent = words + (words.length < textContent.length ? '...' : '');
      return post;
    });
  },
  currentUserId() {
    return auth.currentUser ? auth.currentUser.uid : null;
  },
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
  margin-left: 300px; 
  margin-top: 90px; 
  ::-webkit-scrollbar {
    display: none;
  }
}

.content-container {
  display: flex;
  min-height: 100vh; 
  margin-top: -90px; 
  padding-top: 90px; 
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  padding: 16px;
  border-bottom: 1px solid #ccc;
}

.middle-row {
  display: flex;
  padding: 16px;
}

.right-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.posts-section {
  flex: 1; 
  overflow-y: auto; 
  padding: 20px;
  background: #ccc;
}

.sidebar-section {
  flex: 0 0 30%; 
  max-width: 30%;
  padding: 20px;
  background: #ccc;
  display: flex;
  flex-direction: column;
  position: sticky; 
  top: 90px; 
  height: calc(100vh - 90px); 
  overflow-y: auto; 
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

.create-post-btn, .sidebar-btn, .tag-btn, .read-more-btn, .delete-post-btn {
  padding: 10px 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #E4E7F0;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.article {
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: auto; 
  width: auto; 
}

.article button {
  margin-top: 8px; 
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%; 
}

.cover-photo-container {
  flex: none; 
  width: 150px; 
  height: 100px; 
  margin-right: 16px; 
}

.cover-photo {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 4px;
}

.hashtags-container {
  margin-bottom: 8px;
}

.blog-content {
  overflow: visible;
  display: block;
  max-height: none;
}

.comment-section {
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #ccc;
}

.comment-input {
  flex-grow: 1;
  margin-right: 8px;
  padding: 8px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.comment-buttons {
  display: flex;
  align-items: center;
}

.comment-buttons button {
  padding: 8px 12px;
  margin-left: 8px; 
  background-color: #E4E7F0;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.comments-container {
  padding: 16px;
  background-color: #f8f8f8; 
}

.comment {
  padding: 8px;
  border-bottom: 1px solid black; 
}

.sidebar-buttons {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
  max-height: calc(100vh - 210px); 
}

.tag-btn {
  margin-bottom: 5px;
  background-color: #E4E7F0;
  border: none;
  border-radius: 15px;
  padding: 8px; 
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.create-post-btn:hover, .sidebar-btn:hover, .tag-btn:hover, .comment-buttons button:hover, .read-more-btn:hover, .delete-post-btn:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
  color: white;
}


.tag-container {
  background-color: #E4E7F0;
  padding: 8px; 
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

.no-cover-photo {
  width: 150px;
  height: 100px;
  background-color: #e0e0e0; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  color: #757575;
  font-size: 0.8em;
}
</style>