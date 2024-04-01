<template>
    <div class="forum-container">
      <!-- Posts Section -->
      <div class="posts-section">
        <!-- Search and Create Post Bar -->
        <div class="search-create-bar">
          <input type="text" placeholder="Search" class="search-input"/>
          <button class="create-post-btn">Create Post</button>
        </div>
  
        <!-- Placeholder Articles -->
        <div class="article" v-for="article in articles" :key="article.title">
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
        </div>
      </div>
  
      <!-- Sidebar Section -->
      <div class="sidebar-section">
        <!-- Sidebar Buttons -->
        <div class="sidebar-buttons">
          <div class="button-group">
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
  export default {
    name: 'Forum',
    data() {
      return {
        articles: [
          { title: 'Blockchain developer best practices', description: 'Most recent news for blockchain...' },
          { title: 'The top finance trends', description: 'The market is booming...' },
          { title: 'OnePay - Online Payment Processing Web App - Download from uihut.com', description: 'uihut is...' },
        ],
        tags: ['fintech', 'bitcoin', 'stocks', 'budgeting', 'tutorial', 'business']
      };
    }
  };
  </script>
  
  <style scoped>
  .forum-container {
    display: flex;
    padding-top: 90px; /* Adjust for loginnavbar */
    margin-left: 300px; /* Adjust for the left sidebar */
    background: #fff; /* Set background to white */
  }
  
  .posts-section {
    flex: 0 0 75%;
    padding: 20px;
    background: #ccc; /* Set the background to light grey */
  }
  
  .sidebar-section {
    flex: 0 0 25%;
    padding: 20px;
    background: #ccc; /* Set the background to light grey */
    height: calc(100vh - 90px);
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
    background: #bbb; /* Darker grey */
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    flex: 1 0 33%; /* Take up 1/3 of the space */
  }
  
  .tags-section {
    background: #bbb; /* Darker grey */
    padding: 20px;
    border-radius: 10px;
    flex: 2 0 67%; /* Take up 2/3 of the space */
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
  
  /* Additional styles and responsive adjustments as needed */
  </style>
  