<template>
    <div class="create-post-form">
      <div class="title-upload-container">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" class="blog-title-input"/>
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
          alert("Only JPG/JPEG and PNG files are allowed.");
        }
      },
      clearImage() {
        this.coverPhoto = null;
        this.coverPhotoFile = null;
        this.$refs.coverPhotoInput.value = ''; // Reset input after removing the photo
      },
      async publishPost() {
        if (!this.blogTitle || !this.blogContent) {
          this.showErrorMessage = 'Please enter a title and content for the post.';
          return;
        }
        try {
          const postRef = dbRef(db, `users/${auth.currentUser.uid}/posts`);
          const newPostRef = push(postRef);
          await set(newPostRef, {
            title: this.blogTitle,
            coverPhoto: this.coverPhoto, // Directly using the Data URL from FileReader if any
            content: this.blogContent,
            createdAt: new Date().toISOString()
          });
          this.showSuccessMessage = 'Post published successfully!';
          setTimeout(() => {
            this.showSuccessMessage = '';
            this.$router.push('/forum'); // Redirect to forum page
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

.blog-title-input {
  width: 20%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 1rem;
}

.upload-cover-photo-button {
  width: 10%;
  padding: 10px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.publish-btn {
  width: 10%;
  padding: 10px 20px;
  margin-top: 1rem;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

.upload-cover-photo-button:hover,
.publish-btn:hover {
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.cover-photo-preview-container {
  margin-bottom: 1rem;
}

.cover-photo-preview {
  max-width: 100%;
}

.cover-photo-preview {
max-width: 100%;
margin-bottom: 20px;
}

.quill-container {
height: 600px; 
background: #ffffff;
border: 1px solid #ccc;
padding: 10px;
}

.remove-cover-photo-button {
  margin-top: 10px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-cover-photo-button:hover {
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
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