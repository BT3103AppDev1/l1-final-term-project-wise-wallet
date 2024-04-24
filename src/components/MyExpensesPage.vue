<template>
  <div class="transaction-management">
      <div class="left-panel">
        <div class="top-container">
          <div class="header">
            <div class="search-container">
               <input type="text" class="search-box" placeholder="Search" v-model="searchTerm" />
                  </div>
            <button id="add-new-button" class="add-button" @click="toggleTransactionForm">
              {{ showTransactionForm ? '-' : '+' }} {{ showTransactionForm ? 'Hide' : 'Add' }}
            </button>
            <div class = 'showAmount'>
              <div class = 'showExpenses'>
                <h1>Total Expenses for the Month: ${{ totalExpensesForMonth }}</h1>
              </div>
              <div class = 'showIncome'>
                <h1>Total Income for the Month: ${{ totalIncomeForMonth }}</h1>
              </div>
            </div>
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
                    <option value="Income">Other Income</option>
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
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>
                <!-- Location -->
                <div class="input-box">
                  <label class="details">Vendor:</label>
                  <input type="text" v-model="transactionVendor" required>
                </div>
              </div>
              <div v-if="isInEditMode" class="deleteButton"> 
              <button type="button" @click="deleteTransaction(selectedTransaction)">Delete</button> </div>
              <!-- Submit Button -->
              <div class="saveButton">
                <button type ="submit">Submit</button>
              </div>
              
            </form>
          </div>
        <div class="transactions-section">
          <!-- Today's Transactions -->
          <div class ='day-section'>
            <h2>Transactions for Selected Date: {{ selectedDate }}</h2>
            <div class="transaction-item" v-for="transaction in filteredTodayTransactions" :key="transaction.id">
                <div :class="['transaction-icon', categoryIconMap[transaction.transactionCategory]]"></div>
              
              <div class="transaction-description">
                <span class="transaction-title">{{ transaction.transactionCategory }}</span>
                <span class="transaction-subtitle">{{ transaction.transactionDescription }}</span> <br>
                <span class="transaction-subtitle">{{ transaction.transactionVendor }}</span>
              </div>
              <button id="edit-button" class="edit-button" @click="selectTransactionForEdit(transaction)"> {{ isInEditMode ? ' Edit' : 'Edit' }}</button>
              <div class="transaction-amount" :class="transaction.transactionAmount < 0 ? 'negative' : 'positive'">${{ Math.abs(transaction.transactionAmount).toFixed(2) }}</div>
              <span class="transaction-subtitle">{{ transaction.transactionPaymentMethod }}</span>
            </div>
          </div>
          <!-- Yesterday's Transactions -->
          <div class ='day-section'>
            <h2>Yesterday</h2>
            <div class="transaction-item" v-for="transaction in filteredYesterdayTransactions" :key="transaction.id">
              <div :class="['transaction-icon', categoryIconMap[transaction.transactionCategory]]"></div>
              <div class="transaction-description">
                <span class="transaction-title">{{ transaction.transactionCategory }}</span>
                <span class="transaction-subtitle">{{ transaction.transactionDescription }}</span> <br>
                <span class="transaction-subtitle">{{ transaction.transactionVendor }}</span>
              </div>
              <button id="edit-button" class="edit-button" @click="selectTransactionForEdit(transaction)"> {{ isInEditMode ? ' Edit' : 'Edit' }}</button>

              <div class="transaction-amount" :class="transaction.transactionAmount < 0 ? 'negative' : 'positive'">${{ Math.abs(transaction.transactionAmount).toFixed(2) }}</div>
              <span class="transaction-subtitle">{{ transaction.transactionPaymentMethod }}</span>
            </div>
          </div>
        </div>
      </div>


  <div class="right-panel">
    <div class="date-picker-container">
                <input type="date" v-model="selectedDate" @change="filterTransactionsByDate" />
            </div>
    <div class="filter-transaction-header">
      <h2>Filter Transaction</h2>
      <button class="reset-button" @click="resetFilters">Reset</button>
    </div>
    <div class="filters-container">
      <div class="filter-section">
          <h2>Filter By: </h2> 
          <button :class="{'filter-button': true, 'active': activeFilterPaymentMethod === 'Bank Transfer'}"
        @click="setFilterPaymentMethod('Bank Transfer')"> Bank Transfer </button>
    <button :class="{'filter-button': true, 'active': activeFilterPaymentMethod === 'Credit Card'}"
            @click="setFilterPaymentMethod('Credit Card')">Credit Card</button>
    <button :class="{'filter-button': true, 'active': activeFilterPaymentMethod === 'Debit Card'}"
            @click="setFilterPaymentMethod('Debit Card')">Debit Card</button>
        </div>
        <div class="sort-section">
          <h2>Sort By:</h2>
    <button :class="{'sort-button': true, 'active': activeSortBy === 'Highest'}"
            @click="setSortBy('Highest')">Highest</button>
    <button :class="{'sort-button': true, 'active': activeSortBy === 'Lowest'}"
            @click="setSortBy('Lowest')">Lowest</button>
    <button :class="{'sort-button': true, 'active': activeSortBy === 'Category A-Z'}"
            @click="setSortBy('Category A-Z')">Category A-Z</button>
    <button :class="{'sort-button': true, 'active': activeSortBy === 'Category Z-A'}"
            @click="setSortBy('Category Z-A')">Category Z-A</button>
        </div>
        <div class="category-section">
          <h2>Category:</h2>
          <select class="category-select" v-model="filterCategory">
            <option value="">Choose Category</option>
                    <option value="Salary">Salary</option>
                    <option value="Income">Other Income</option>
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
import {ref, push, onValue, remove, update} from 'firebase/database';
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
      yesterdayTransactions: [],
      isInEditMode: false,
      selectedTransaction: null,
      searchTerm: '',
      filterPaymentMethod: '',
      filterCategory: '',
      filterSortBy: '',
      totalExpensesForMonth: 0,
      totalIncomeForMonth: 0,
      selectedDate: this.getCurrentDate(), 
      categoryIconMap: {
        'Salary':'bx bxs-bank',
        'Income':'bx bx-wallet',
        'Food': 'bx bx-bowl-rice',
        'Transportation': 'bx bx-car',
        'Utilities': 'bx bx-shower',
        'Housing':'bx bx-building-house',
        'Entertainment':'bx bx-music',
        'Clothing':'bx bxs-t-shirt',
        'Healthcare': 'bx bx-heart',
        'Education':'bx bx-book',
        'Travel':'bx bxs-plane-take-off',
        'Gifts':'bx bx-gift',
        'Insurance':'bx bx-shield-plus',
        'Investments':'bx bx-money-withdraw',
        'Charity':'bx bx-donate-heart',
        'Other':'bx bx-square-rounded'
            // Add more mappings for other transaction categories as needed
        },
        activeFilterPaymentMethod: '', // Stores the active filter state for payment methods
        activeSortBy: '',              // Stores the active sort state
  };
},
mounted(){
  this.transactionDate = this.getCurrentDate();
  this.fetchTransactions(this.getCurrentDate());
  this.fetchTransactionData();
},
methods:{
  setFilterPaymentMethod(method) {
    this.activeFilterPaymentMethod = method;
    this.filterPaymentMethod = method;
  },
  setSortBy(sortMethod) {
    this.activeSortBy = sortMethod;
    this.filterSortBy = sortMethod;
  },
  fetchTransactionData(selectedDate) {
        const currentUser = auth.currentUser;
        const userTransactionsRef = ref(db, `transactions/${currentUser.uid}`);
        onValue(userTransactionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.transactionData = Object.values(data); // Assign transaction data to the component's property
                this.calculateTotalExpensesForMonth(this.selectedDate); // Calculate total expenses for the month after fetching transaction data
                this.calculateTotalIncomeForMonth(this.selectedDate);
            }
        });
    },
    calculateTotalExpensesForMonth(selectedDate) {
    if (this.transactionData) {
        const currentDate = new Date(selectedDate);
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthExpenses = this.transactionData.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDate);
            return (
                transactionDate.getMonth() + 1 === currentMonth &&
                transactionDate.getFullYear() === currentYear &&
                transaction.transactionCategory !== 'Salary' &&
                transaction.transactionCategory !== 'Income'
            );
        });

        // Calculate total expenses for the current month
        this.totalExpensesForMonth = currentMonthExpenses.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
        // Ensure totalExpenses is positive
        this.totalExpensesForMonth = Math.abs(this.totalExpensesForMonth).toFixed(2);
    } else {
        console.error("Transaction data is not available.");
    }
},

calculateTotalIncomeForMonth(selectedDate) {
    if (this.transactionData) {
        const currentDate = new Date(selectedDate);
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const currentMonthIncome = this.transactionData.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDate);
            return (
                transactionDate.getMonth() + 1 === currentMonth &&
                transactionDate.getFullYear() === currentYear &&
                (transaction.transactionCategory === 'Income' || transaction.transactionCategory === 'Salary')
            );
        });

        // Calculate total income for the current month
        const totalIncome = currentMonthIncome.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);

        // Ensure totalIncome is positive and formatted to two decimal places
        this.totalIncomeForMonth = Math.abs(totalIncome).toFixed(2);
    } else {
        console.error("Transaction data is not available.");
    }
},
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
  saveTransaction() {
    const currentUser = auth.currentUser;
    // Structuring transaction data for reuse in both new and update operations
    const transactionData = {
        transactionAmount: this.transactionAmount,
        transactionCategory: this.transactionCategory,
        transactionDate: this.transactionDate,
        transactionDescription: this.transactionDescription,
        transactionVendor: this.transactionVendor,
        transactionPaymentMethod: this.transactionPaymentMethod
    };

    if (this.isInEditMode && this.selectedTransaction && this.selectedTransaction.id) {
        const transactionRef = ref(db, `transactions/${currentUser.uid}/${this.selectedTransaction.id}`);
        update(transactionRef, transactionData).then(() => {
            alert('Transaction updated successfully');
        }).catch((error) => {
            console.error('Error updating transaction:', error);
        });
    } else {
        // Adding a new transaction
        const userTransactionsRef = ref(db, `transactions/${currentUser.uid}`);
        push(userTransactionsRef, transactionData).then((data) => {
            alert('New transaction saved successfully');
        }).catch((error) => {
            console.error('Error saving new transaction:', error);
        });
    }

    // Reset form fields and state
    this.clearForm();
    this.showTransactionForm = false;
    this.isInEditMode = false;
    this.selectedTransaction = null;
    this.fetchTransactions(this.selectedDate);
},
  filterTransactionsByDate() {
      const selectedDate = new Date(this.selectedDate);
      this.fetchTransactions(selectedDate);
      this.fetchTransactionData(selectedDate)
    },

    isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  },
  matchesFilters(transaction) {
    const matchesPaymentMethod = this.filterPaymentMethod ? transaction.transactionPaymentMethod === this.filterPaymentMethod : true;
    const matchesCategory = this.filterCategory ? transaction.transactionCategory === this.filterCategory : true;
    const matchesSearchTerm = this.searchTerm.trim() ? transaction.transactionDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                  transaction.transactionCategory.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                  transaction.transactionVendor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                  transaction.transactionPaymentMethod.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
    return matchesPaymentMethod && matchesCategory && matchesSearchTerm;
  },
  applySorting(a, b) {
    if (this.filterSortBy === 'Highest') {
      return parseFloat(b.transactionAmount) - parseFloat(a.transactionAmount);
    } else if (this.filterSortBy === 'Lowest') {
      return parseFloat(a.transactionAmount) - parseFloat(b.transactionAmount);
    } else if (this.filterSortBy === 'Category A-Z') {
      return a.transactionCategory.localeCompare(b.transactionCategory);
    } else if (this.filterSortBy === 'Category Z-A') {
      return b.transactionCategory.localeCompare(a.transactionCategory);
    }
    return 0;
  },
  
  fetchTransactions(selectedDate) {
    const currentUser = auth.currentUser;
    const userTransactionsRef = ref(db, `transactions/${currentUser.uid}`);
    onValue(userTransactionsRef, (snapshot) => {
        this.todayTransactions = [];
        this.yesterdayTransactions = [];
        const selectedDateObject = new Date(selectedDate);
        const yesterdayDateObject = new Date(selectedDate);
        yesterdayDateObject.setDate(yesterdayDateObject.getDate() - 1);
        snapshot.forEach((childSnapshot) => {
            const transaction = childSnapshot.val();
            transaction.id = childSnapshot.key;
            const transactionDate = new Date(transaction.transactionDate);
            if (this.isSameDay(transactionDate, selectedDateObject)) {
        this.todayTransactions.push(transaction);
      } else if (this.isSameDay(transactionDate, yesterdayDateObject)) {
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
    },
    selectTransactionForEdit(transaction) {
      this.isInEditMode = true;
      this.selectedTransaction = transaction;
      this.transactionAmount = transaction.transactionAmount.toString(); 
      this.transactionCategory = transaction.transactionCategory;
      this.transactionDate = transaction.transactionDate;
      this.transactionDescription = transaction.transactionDescription;
      this.transactionVendor = transaction.transactionVendor;
      this.transactionPaymentMethod = transaction.transactionPaymentMethod;
      
      if (!this.showTransactionForm) {
        this.toggleTransactionForm();
      }
    },

    deleteTransaction(selectedTransaction) {
      const currentUser = auth.currentUser;
      const transactionRef = ref(db, `transactions/${currentUser.uid}/${selectedTransaction.id}`);
      remove(transactionRef)
          .then(() => {
              this.showTransactionForm = false;
              alert('Transaction deleted successfully'); 
              this.fetchTransactions(this.selectedDate);
              this.isInEditMode = false;
              this.clearForm();
          })
          .catch((error) => {
              alert('Error deleting transaction: ' + error.message); // Show an error message
          });
},

    clearForm() {
      this.selectedTransaction = null;
      this.transactionAmount = '';
      this.transactionCategory = '';
      this.transactionDate = this.getCurrentDate();
      this.transactionDescription = '';
      this.transactionVendor = '';
      this.transactionPaymentMethod = '';
    },
    resetFilters() {
        this.filterPaymentMethod = '';  // Clear filter for payment method
        this.filterCategory = '';       // Clear category filter
        this.filterSortBy = '';         // Clear sorting method
        this.searchTerm = '';           // Clear search term
        this.activeFilterPaymentMethod = '';  // Clear active UI state for payment method filter
        this.activeSortBy = '';         // Clear active UI state for sort method
    },
      },
    computed: {
      filteredTodayTransactions() {
    return this.todayTransactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        return this.matchesFilters(transaction);
      })
      .sort(this.applySorting);
  },
  filteredYesterdayTransactions() {
    return this.yesterdayTransactions
      .filter(transaction => {
        return this.matchesFilters(transaction);
      })
      .sort(this.applySorting);
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
.saveButton,.deleteButton{
  display: flex;
  justify-content: flex-end;
}

 button{
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

 button:hover {
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
font-size: 50px;
margin:2rem
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
  background-color: #5D5FEF;
  color: white;
  width: 110%;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px; /* Bottom margin for spacing between rows */
}

.filter-button.active, .sort-button.active {
  background-color: #4b4b55; /* Darker shade for active button */
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
.showAmount {
    background-color: #f0f0f0; /* Set background color to a light grey */
    padding: 20px; /* Add padding */
    border-radius: 8px; /* Add border radius for rounded corners */
}
.showIncome h1,
.showExpenses h1 {
    font-size: 24px; /* Decrease font size for better readability */
    font-weight: bold; /* Make the text bold */
    color: #333; /* Set text color to a dark shade */
    margin-bottom: 10px; /* Add space between the heading and other content */
}
.date-picker-container {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

input[type="date"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
</style>