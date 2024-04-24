<template>
  <div class="create-post-form">
    <div class="title-upload-container">
      <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" class="blog-title-input"/>
      <input type="text" placeholder="Enter Hashtags (e.g., #finance #budgeting)" v-model="hashtagsInput" class="hashtags-input"/>
      <button type="button" @click="clickUpload" class="upload-cover-photo-button">Upload Cover Photo</button>
      <input type="file" @change="handleCoverPhotoUpload" accept=".jpg, .jpeg, .png" class="cover-photo-input" ref="coverPhotoInput" style="display: none;"/>
    </div>
    <div v-if="coverPhoto" class="cover-photo-preview-container">
      <img :src="coverPhoto" class="cover-photo-preview"/>
      <button type="button" @click="clearImage" class="remove-cover-photo-button">Remove</button>
    </div>
    <div ref="quillEditor" class="quill-container"></div>
    <button type="button" @click="publishPost" class="publish-btn">Publish Post</button>
    <p v-if="showSuccessMessage" class="success-message">{{ showSuccessMessage }}</p>
    <p v-if="showErrorMessage" class="error-message">{{ showErrorMessage }}</p>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ref as dbRef, push, set } from 'firebase/database';
import { db, auth } from '@/assets/firebase.js';

export default {
  name: 'CreatePostForm',
  data() {
    return {
      blogTitle: '',
      coverPhoto: null,
      coverPhotoFile: null,
      blogContent: '',
      hashtagsInput: '',
      quill: null,
      showSuccessMessage: '',
      showErrorMessage: ''
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: 'snow',
    });
    this.quill.on('text-change', () => {
      this.blogContent = this.quill.root.innerHTML;
    });
  },
  methods: {
    clickUpload() {
      this.$refs.coverPhotoInput.click();
    },
    handleCoverPhotoUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.coverPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
        this.coverPhotoFile = file;
      } else {
        this.showErrorMessage = "Only JPG/JPEG and PNG files are allowed.";
      }
    },
    clearImage() {
      this.coverPhoto = null;
      this.coverPhotoFile = null;
      this.$refs.coverPhotoInput.value = '';
    },
    async publishPost() {
      const rawHashtags = this.hashtagsInput.split(/\s+/);
      const hashtags = rawHashtags.filter(tag => tag.startsWith('#'));
      const uniqueHashtags = new Set(hashtags);
      if (hashtags.length !== uniqueHashtags.size) {
        this.showErrorMessage = 'Each hashtag must be unique. Remove duplicate hashtags.';
        return;
      }
      if (!this.blogTitle || !this.blogContent || hashtags.length === 0) {
        this.showErrorMessage = 'Please enter a title, content, and at least one hashtag starting with "#".';
        return;
      }
      try {
        const postRef = dbRef(db, 'posts');
        const newPostRef = push(postRef);
        await set(newPostRef, {
          title: this.blogTitle,
          coverPhoto: this.coverPhoto,
          content: this.blogContent,
          hashtags: [...uniqueHashtags],
          createdAt: new Date().toISOString(),
          userId: auth.currentUser.uid
        });
        this.showSuccessMessage = 'Post published successfully!';
        setTimeout(() => {
          this.showSuccessMessage = '';
          this.$router.push('/forum');
        }, 3000);
      } catch (error) {
        console.error("Error publishing post: ", error);
        this.showErrorMessage = 'Error publishing post: ' + error.message;
      }
    }
  }
};
</script>

<style scoped>
.create-post-form {
  max-width: calc(100vw - 300px);
  margin-left: 300px;
  margin-top: 90px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.title-upload-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.blog-title-input, .hashtags-input {
  flex-grow: 1;
  margin-right: 1rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.upload-cover-photo-button, .publish-btn, .remove-cover-photo-button {
  padding: 10px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-cover-photo-button:hover, .publish-btn:hover, .remove-cover-photo-button:hover {
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.remove-cover-photo-button {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cover-photo-preview-container {
  position: relative;
  margin-bottom: 1rem;
}

.cover-photo-preview {
  max-width: 100%;
  max-height: 200px; /* Set a max-height for the cover photo */
  margin-bottom: 20px;
}

.quill-container {
  height: 600px; 
  background: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
}

.success-message {
  color: green;
  text-align: center;
}

.error-message {
  color: red;
  text-align: center;
}
</style>