<template>
    <div class="transaction-management">
        <div class="left-panel">
      <div class="top-container">
        <div class="header">
          <div class="search-container">
            <input type="text" class="search-box" placeholder="Search" />
          </div>
          <button class="add-button">+ Add New</button>
        </div>

    <div class="transactions-section">
      <!-- Today's Transactions -->
      <div class="day-section">
        <h2>Today</h2>
        <div class="transaction-item">
          <div class="transaction-icon shopping-icon"></div>
          <div class="transaction-description">
            <span class="transaction-title">Shopping</span>
            <span class="transaction-subtitle">Buy some grocery</span>
          </div>
          <div class="transaction-amount negative">- $120</div>
        </div>
        <!-- More transactions... -->
    </div>


      <!-- Yesterday's Transactions -->
      <div class="day-section">
        <h2>Yesterday</h2>
        <div class="transaction-item">
          <div class="transaction-icon salary-icon"></div>
          <div class="transaction-description">
            <span class="transaction-title">Salary</span>
            <span class="transaction-subtitle">Salary for July</span>
          </div>
          <div class="transaction-amount positive">+ $5000</div>
        </div>
        <!-- More transactions... -->
      </div>
    </div>
</div>


    <div class="right-panel">
      <div class="filters-container">
        <div class="filter-section">
            <h2>Filter By: </h2> 
            <button class="filter-button">Income</button>
            <button class="filter-button active">Expense</button>
            <button class="filter-button">Transfer</button>
          </div>
          <div class="sort-section">
            <h2>Sort By:</h2>
            <button class="sort-button">Highest</button>
            <button class="sort-button">Lowest</button>
            <button class="sort-button">Newest</button>
            <button class="sort-button">Oldest</button>
          </div>
          <div class="category-section">
            <h2>Category:</h2>
            <select class="category-select">
              <option value="">Choose Category</option>
              <!-- Categories go here -->
            </select>
            <button class="apply-button">Apply</button>
        </div>
      <div class="status-message">
        <div class="status-icon"></div>
        <span>Expense management is up to date.</span>
    </div>
    </div>
</div>
    </div>
        </div>


  </template>
  
    <style scoped>
    
.transaction-management {
  display: flex;
  flex-direction: row;
  background: #F8F9FD;
  padding: 2rem;
  height: calc(100vh - 90px);
  margin-left: 300px; 
  margin-top: 100px;
}

.top-container {
    display: flex;
flex-direction: column;
  width: 100%;
}
    .left-panel {
    width: 80%; /* Assign half the width to the left panel */
    display: flex;
    margin-bottom: 1px;
    }

.right-panel {
 margin: center;
  width: 30%;
  padding-left: 3rem; /* Optional spacing between panels */
}
 
  .search-container {
    flex-grow: 1;
    display: flex-start;
    align-items: center;
  }
  
  .search-box {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 100%; /* Full width of the search container */
  margin-bottom: 10px; /* Bottom margin for spacing between rows */
}
  
  .add-button {
    background-color: #5D5FEF;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .filters-container {
  align-items: flex-start; /* Align to the end (right side) */
  width: 200%; /* Allow each section to fill the width */
  padding: auto;
  
}

.filter-section,
.sort-section,
.category-section {
    width: 100%; /* Allow each section to fill the width */
}

/* Transactions Section */
.transactions-section {
    display: flex-start;
    width: 100%;
    overflow: auto; /* In case you need scrolling when list gets too long */
  }

  .day-section {
    background: white;
    border-radius: 10px;
    margin: 20px 0;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Add shadow to each day-section for better separation */
  }

  .transaction-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    border-bottom: 1px solid #eee; /* If you want to separate the items */
  padding-bottom: 0.5rem; /* Add some padding to the bottom of each item */
  margin-bottom: 0.5rem; /* Add some margin to the bottom of each item */
  }

  .transaction-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .shopping-icon {
    background-color: #FDDFDF; /* Example color for shopping icon */
  }

  .salary-icon {
    background-color: #DFFDDF; /* Example color for salary icon */
  }

  .transaction-description {
    flex-grow: 1;
  }

  .transaction-title {
    display: block;
    font-weight: bold;
  }

  .transaction-subtitle {
    font-size: 0.9em;
    color: #777;
  }

  .transaction-amount {
    font-weight: bold;
    padding: 5px 15px;
  }

  .negative {
    color: #E53E3E; /* Example color for expenses */
  }

  .positive {
    color: #38A169; /* Example color for income */
  }

  
  .filter-button, .sort-button {
    background-color: #E4E7F0;
    border: none;
    width: 110%;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 10px; /* Bottom margin for spacing between rows */
  }
  
  .filter-button.active {
    background-color: #5D5FEF;
    color: white;
  }
  
  .category-select {
    padding: 5px 15px;
    border-radius: 15px;
    border: 1px solid #ccc;
    width:110%;
    flex-direction: column;
    margin-bottom: 10px; /* Bottom margin for spacing between rows */

  }
  
  .apply-button {
    background-color: #5D5FEF;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 20px;
    cursor: pointer;
  }
  
  .status-message {
    display: flex;
    padding: 20px;
    width: 130%;
    border-radius: 50px;
    background: #625FF5;
    color: white;
    margin-top: 10px;
    width: 110%
  }
  
  .status-icon {
    display: inline-block;
    width: 100;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>
  