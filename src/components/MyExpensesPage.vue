<template>
    <div class="transaction-management">
        <div class="left-panel">
          <div class="top-container">
            <div class="header">
              <div class="search-container">
                <input type="text" class="search-box" placeholder="Search" />
              </div>
              <button id="add-new-button" class="add-button" @click="toggleTransactionForm">
                {{ showTransactionForm ? '-' : '+' }} {{ showTransactionForm ? 'Hide' : 'Add New' }}
              </button>
              <!-- Transaction entry form (initially hidden) v-if="showTransactionForm" -->
              <form @submit.prevent="saveTransaction" v-if="showTransactionForm">
                <div class="user-details">
                  <!-- Date -->
                  <div class="input-box">
                    <label class="details">Date:</label>
                    <input type="Date" v-model="transactionDate" required>
                  </div>
                  <!-- Category -->
                  <div class="input-box">
                    <label class="details">Category:</label>
                    <select v-model="transactionCategory" required>
                      <option value="Salary">Salary</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Housing">Housing</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Travel">Travel</option>
                      <option value="Gifts">Gifts</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Investments">Investments</option>
                      <option value="Charity">Charity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <!-- Amount -->
                  <div class="input-box">
                    <label class="details">Amount (+/-):</label>
                    <input type="text" v-model="transactionAmount" required>
                  </div>
                  <!-- Description -->
                  <div class="input-box">
                    <label class="details">Description:</label>
                    <input type="text" v-model="transactionDescription" required>
                  </div>
                  <!-- Payment Method -->
                  <div class="input-box">
                    <label class="details">Payment Method:</label>
                    <select v-model="transactionPaymentMethod" required>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                    </select>
                  </div>
                  <!-- Location -->
                  <div class="input-box">
                    <label class="details">Vendor:</label>
                    <input type="text" v-model="transactionVendor" required>
                  </div>
                </div>
                <!-- Submit Button -->
                <div class="saveButton">
                  <button type ="submit">Submit</button>
                </div>
              </form>
            </div>
          <div class="transactions-section">
            <!-- Today's Transactions -->
            <div class ='day-section'>
              <h2>Today</h2>
              <div class = "transaction-item" v-for="transaction in todayTransactions" :key="transaction.id">
                <div class="transaction-icon shopping-icon"></div>
                <div class="transaction-description">
                  <span class="transaction-title">{{ transaction.transactionCategory }}</span>
                  <span class="transaction-subtitle">{{ transaction.transactionDescription }}</span> <br>
                  <span class="transaction-subtitle">{{ transaction.transactionPaymentMethod }}</span> <br>
                  <span class="transaction-subtitle">{{ transaction.transactionVendor }}</span>
                </div>
                <div class="transaction-amount" :class="transaction.transactionAmount < 0 ? 'negative' : 'positive'">${{ Math.abs(transaction.transactionAmount).toFixed(2) }}</div>
              </div>
            </div>
            <!-- Yesterday's Transactions -->
            <div class ='day-section'>
              <h2>Yesterday</h2>
              <div class = "transaction-item" v-for="transaction in yesterdayTransactions" :key="transaction.id">
                <div class="transaction-icon shopping-icon"></div>
                <div class="transaction-description">
                  <span class="transaction-title">{{ transaction.transactionCategory }}</span>
                  <span class="transaction-subtitle">{{ transaction.transactionDescription }}</span> <br>
                  <span class="transaction-subtitle">{{ transaction.transactionPaymentMethod }}</span> <br>
                  <span class="transaction-subtitle">{{ transaction.transactionVendor }}</span>
                </div>
                <div class="transaction-amount" :class="transaction.transactionAmount < 0 ? 'negative' : 'positive'">${{ Math.abs(transaction.transactionAmount) }}</div>
              </div>
            </div>
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
      <div class="filter-transaction-header">
        <h2>Filter Transaction</h2>
        <button class="reset-button">Reset</button>
      </div>
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
<script>
import {auth, db} from '@/assets/firebase.js';
import {ref, push, onValue} from 'firebase/database';
export default {
  data() {
    return {
        showTransactionForm: false,
        transactionAmount:'',
        transactionCategory:'',
        transactionDate:'',
        transactionDescription:'',
        transactionVendor:'',
        transactionPaymentMethod:'',
        todayTransactions: [],
        yesterdayTransactions: []
    };
  },
  mounted(){
    this.transactionDate = this.getCurrentDate();
    this.fetchTransactions();
  },
  methods:{
    toggleTransactionForm(){
      this.showTransactionForm = !this.showTransactionForm;
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      // Ensure month and day are in two-digit format
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      // Format date as YYYY-MM-DD
      return `${year}-${month}-${day}`;
    },
    saveTransaction(){
        const currentUser = auth.currentUser;
        const transactionAmount = this.transactionAmount;
        const transactionCategory = this.transactionCategory;
        const transactionDate = this.transactionDate;
        const transactionDescription = this.transactionDescription;
        const transactionVendor = this.transactionVendor;
        const transactionPaymentMethod = this.transactionPaymentMethod;
        // Save transactional data to the database
        const userTransactionsRef = ref(db, 'transactions/' + currentUser.uid);
        push(userTransactionsRef, {
          transactionAmount:transactionAmount,
          transactionCategory:transactionCategory,
          transactionDate:transactionDate,
          transactionDescription:transactionDescription,
          transactionVendor:transactionVendor,
          transactionPaymentMethod:transactionPaymentMethod
        }).then(() => {
            console.log('New transaction saved successfully');
            alert('New transaction saved successfully')
        }).catch((error) => {
            console.error('Error saving new transaction:', error);
        });
        this.transactionAmount = '',
        this.transactionCategory = '',
        this.transactionDate = this.getCurrentDate(),
        this.transactionDescription = '',
        this.transactionVendor = '',
        this.transactionPaymentMethod = ''
        this.showTransactionForm = !this.showTransactionForm
      },
      fetchTransactions() {
        const currentUser = auth.currentUser;
        const userTransactionsRef = ref(db, 'transactions/' + currentUser.uid);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        onValue(userTransactionsRef, (snapshot) => {
          this.todayTransactions = [];
          this.yesterdayTransactions = [];

          snapshot.forEach((childSnapshot) => {
          const transaction = childSnapshot.val();
          const transactionDate = new Date(transaction.transactionDate);

          if (this.isToday(transactionDate)) {
            this.todayTransactions.push(transaction);
          } else if (this.isYesterday(transactionDate)) {
            this.yesterdayTransactions.push(transaction);
          }
          });
        });
      },
      isToday(date){
        const today = new Date();
        return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      },
      isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
      }
  }
}
</script>
<style scoped>    
.transaction-management {
  display: flex;
  flex-direction: row;
  background: #F8F9FD;
  padding: 2rem;
  height: calc(100vh - 90px);
  margin-left: 300px;
  margin-top:90px; 
}
.user-details{
    display:flex;
    flex-wrap: wrap;
    font-size: 21px;
    font-weight: 500;
    justify-content: space-between;
    margin:20px 0 12px 0;
}
.input-box{
    margin-bottom:18px;
    width:calc(100% / 2 - 20px);
}
form .input-box .details{
    display:block;
    font-weight:500;
    margin-bottom: 5px;
}
.input-box input,
.input-box select {
    height:45px;
    width:100%;
    outline:none;
    border-radius:5px;
    border:1px solid #ccc;
    padding-left:15px;
    font-size:16px;
    border-bottom-width: 2px;
    transition: border-color 0.3s ease
}
.user-details .input-box input:focus,
.user-details .input-box input:valid{
border-color: #9b59b6;
}
.saveButton{
    display: flex;
    justify-content: flex-end;
}
.saveButton button{
    width: 100px;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size:18px;
    font-weight:500;
    letter-spacing: 1px;
    background:#5D5FEF
}
  
  .saveButton button:hover {
    background:linear-gradient(-135deg, #71b7e6, #9b59b6)
  }
.filter-transaction-header {
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px; /* Space between this header and the filter section */
  }

  .reset-button {
    background-color: #EBEBEB; /* Light grey background for the reset button */
    color: #333; /* Dark text color for contrast */
    border: none;
    border-radius: 15px;
    padding: 5px 15px;
    cursor: pointer;
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
    font-size:15px;
    font-weight:500;
    letter-spacing: 1px;
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
  .negative::before {
    content: '-';
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
  