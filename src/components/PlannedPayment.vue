<template>
    <div class="budgetContainer">
        <div class="budgetTitle">
            <div class="budgetLogo">
                <i class='bx bx-check-shield' ></i>
                <h3>It's your <span>WiseWallet</span> Budget</h3>
            </div>
            <p>Edit and manage your monthly budget here</p>
        </div>
        <div class = "budgetNavContainer">
            <div class="budgetNav">
                <i class='bx bx-cart-add' ></i>
                <router-link to ='/myBudget' class="router-link" style="text-decoration: none; color:inherit">
                    <h3>Budget overview</h3>
                </router-link>
            </div>
            <div class="budgetNav">
                <i class='bx bx-credit-card-alt' ></i>
                <h3>Planned payments</h3>
            </div>
            <div class="budgetNav">
                <i class='bx bx-cog' ></i>
                <router-link to ='/budgetmanagement' class="router-link" style="text-decoration: none; color:inherit">
                <h3>Manage your budget</h3>
                </router-link>
            </div>
        </div>
        <div class="totalPayment">
            <div class="paymentAmount-container">
                <div class="paymentLabel">
                    <h1>{{ getTotalScheduledPayment() }}</h1>
                    <p>Total Scheduled Payment</p>
                </div>
                <div class="paymentLabel">
                    <h1>{{ getTotalAmount('Monthly') }}</h1>
                    <p>Monthly Scheduled Payment</p>
                </div>
                <div class="paymentLabel">
                    <h1>{{ getTotalAmount('Semi-annual') }}</h1>
                    <p>Semi-Annual Scheduled Payment</p>
                </div>
                <div class="paymentLabel">
                    <h1>{{ getTotalAmount('Annual') }}</h1>
                    <p>Annual Scheduled Payment</p>
                </div>
            </div>
            <i class="bx" :class="{ 'bx-plus': !showTransactionForm, 'bx-minus': showTransactionForm }" id="toggleButton" @click="toggleForm"></i>
        </div>
        <!-- Transaction entry form (initially hidden) v-if="showTransactionForm" -->
        <form class='plannedpaymentsform' @submit.prevent="saveTransaction" v-if="showTransactionForm">
              <div class="user-details">
                <!-- Date -->
                <div class="input-box">
                  <label class="details">Payment Due:</label>
                  <input type="Date" v-model="transactionDate" required>
                </div>
                <!-- Category -->
                <div class="input-box">
                  <label class="details">Category:</label>
                  <select v-model="transactionCategory" required>
                    <option value="Utilities">Utilities</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Loan Installments">Loan Installments</option>
                    <option value="Mortgage/Rent">Mortgage/Rent</option>
                    <option value="Music and Entertainment Subscription">Music and Entertainment Subscription</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Investments">Investments</option>
                    <option value="Charitable Donations">Charitable Donations</option>
                    <option value="Taxes">Taxes</option>
                    <option value="Home Maintenance">Home Maintenance</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <!-- Amount -->
                <div class="input-box">
                  <label class="details">Amount:</label>
                  <input type="text" v-model="transactionAmount" required>
                </div>
                <div class="input-box">
                  <label class="details">Frequency of Payments</label>
                  <select v-model="transactionFrequency" required>
                    <option value="Monthly">Monthly</option>
                    <option value="Semi-annual">Semi-Annual</option>
                    <option value="Annual">Annual</option>
                </select>
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
              <!-- Submit Button -->
              <div class="saveButton">
                <button type ="submit">Submit</button>
                <button type="button" @click="cancelEdit">Cancel</button> 
              </div>
              
            </form>
        <div class="payment-list">
            <div v-for = '(transactions,category) in groupedTransactions' :key="category" class="payment-container">
                <div class = "payment-item" @click="toggleTransactionList(category)">
                    <div class="payment-left">
                        <i :class = "getIconClass(category)"></i>
                        <strong>{{ category }}</strong>
                    </div>
                    <p><i class='bx bx-edit-alt'></i>Total Amount: ${{ transactions.totalAmount.toFixed(2) }}</p>
                </div>
                <div v-if="expandedCategory === category">
                    <!-- Transactions list -->
                    <div class = "transaction-list">
                        <div v-for="transaction in transactions.transactions" :key="transaction.id" class="transaction-item">
                            <p class="transaction-description">{{ transaction.transactionDescription }}</p>
                            <p>Amount: <span class="transaction-amount">{{ transaction.transactionAmount }}</span></p>
                            <p>Due: <span class="transaction-date">{{ transaction.transactionDate }}</span></p>
                            <p>Frequency of Payment: <span class="transaction-date">{{ transaction.transactionFrequency }}</span></p>
                            <p>Payment Method: <span class="transaction-date">{{ transaction.transactionPaymentMethod }}</span></p>
                            <p>Vendor: <span class="transaction-date">{{ transaction.transactionVendor }}</span></p>
                            <button @click="promptDelete(transaction.transactionId)">Delete</button>
                            <button @click="openFormForEdit(transaction)">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ConfirmationModal :isVisible="showConfirmModal" message="Are you sure you want to delete this transaction?" @confirm="deleteTransaction" @cancel="cancelDelete"/>

</template>
<script>
import {auth, db} from '@/assets/firebase.js';
import {ref, push, onValue, remove, update} from 'firebase/database';
import ConfirmationModal from '@/components/ConfirmationModal.vue'; 

export default{
    data(){
        return {
            showTransactionForm: false,
            transactionAmount:'',
            transactionCategory:'',
            transactionDate:'',
            transactionDescription:'',
            transactionFrequency:'',
            transactionVendor:'',
            transactionPaymentMethod:'',
            transactionData:[],
            expandedCategory: null,
            showConfirmModal: false,  // For controlling modal visibility
            selectedTransactionId: null,
            monthlyPlannedPayments: 0,
            isInEditMode: false
        };
    },
    components: {
        ConfirmationModal,
    },
    mounted(){
        const currentUser = auth.currentUser;
        const userTransactionsRef = ref(db, `plannedpayments/${currentUser.uid}`);
        onValue(userTransactionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data){
                this.transactionData = Object.values(data);
            }
        });
    },
    computed:{
        groupedTransactions(){
            const grouped = {};
            this.transactionData.forEach(transaction => {
                const category = transaction.transactionCategory;
                if (!grouped[category]){
                    grouped[category] = {
                        transactions:[],
                        totalAmount:0
                    };
                }
                grouped[category].transactions.push(transaction);
                grouped[category].totalAmount += parseFloat(transaction.transactionAmount)
            });
            console.log(grouped)
            return grouped;
        },
        totalMonthlyAmount() {
            this.monthlyPlannedPayments = getTotalAmountWithoutCurrencyCalc()
            return this.monthlyPlannedPayments;
        },
    },
    methods:{
        toggleForm(){
            this.showTransactionForm = !this.showTransactionForm;
        },
        getTotalAmount(frequency){
             // Filter transactions based on frequency
            const filteredTransactions = this.transactionData.filter(transaction => transaction.transactionFrequency === frequency);
            // Calculate total amount for filtered transactions
            const totalAmount = filteredTransactions.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
            return totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        getTotalScheduledPayment() {
            // Calculate total amount for all scheduled payments
            const totalAmount = this.transactionData.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
            // Format total amount to display with currency symbol and comma separator
            return totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        saveTransaction() {
        const currentUser = auth.currentUser;
        const userTransactionsRef = ref(db, `plannedpayments/${currentUser.uid}`);

        // Structuring transaction data for reuse in both new and update operations
        const transactionData = {
            transactionAmount: this.transactionAmount,
            transactionCategory: this.transactionCategory,
            transactionDate: this.transactionDate,
            transactionDescription: this.transactionDescription,
            transactionFrequency: this.transactionFrequency,
            transactionVendor: this.transactionVendor,
            transactionPaymentMethod: this.transactionPaymentMethod
        };

        if (this.isInEditMode) {
            // Update the existing transaction
            const updateRef = ref(db, `plannedpayments/${currentUser.uid}/${this.selectedTransactionId}`);
            update(updateRef, transactionData)
                .then(() => {
                    console.log('Transaction updated successfully');
                    alert('Transaction updated successfully');
                    this.resetForm();
                })
                .catch((error) => {
                    console.error('Error updating transaction:', error);
                    alert('Error updating transaction');
                });
        } else {
            // Adding a new transaction
            push(userTransactionsRef, transactionData)
                .then((newTransactionRef) => {
                    const transactionId = newTransactionRef.key;
                    update(newTransactionRef, { transactionId: transactionId })
                        .then(() => {
                            console.log('New planned payments saved successfully with ID:', transactionId);
                            alert('New planned payments saved successfully');
                            this.resetForm();
                        })
                        .catch((error) => {
                            console.error('Error adding transaction ID to transaction data:', error);
                            alert('Error saving planned payments');
                        });
                })
                .catch((error) => {
                    console.error('Error saving planned payments:', error);
                    alert('Error saving planned payments');
                });
        }
    },
        getIconClass(category){
            const iconClasses = {
                'Utilities':'bx bx-shower',
                'Insurance': 'bx bxs-shield-plus',
                'Loan Installments':'bx bxs-bank',
                'Mortgage/Rent':'bx bx-home',
                'Music and Entertainment Subscription':'bx bxl-spotify',
                'Healthcare':'bx bx-plus-medical',
                'Education':'bx bx-book',
                'Investments':'bx bx-line-chart',
                'Charitable Donations':'bx bx-donate-heart',
                'Taxes':'bx bxs-landmark',
                'Home Maintenance':'bx bx-wrench'
            };
            return iconClasses[category] || 'bx bx-question-circle';
        },
        toggleTransactionList(category){
            this.expandedCategory = (this.expandedCategory === category) ? null : category;
            console.log(this.expandedCategory)
        },
        promptDelete(transactionId) {
        console.log(transactionId)
        this.selectedTransactionId = transactionId;
        this.showConfirmModal = true;
    },
    deleteTransaction() {
        if (!this.selectedTransactionId) return;
        const currentUser = auth.currentUser;
        const transactionRef = ref(db, `plannedpayments/${currentUser.uid}/${this.selectedTransactionId}`);
        remove(transactionRef)
            .then(() => {
                console.log('Transaction deleted successfully');
                this.showConfirmModal = false; // Hide the modal
            })
            .catch(error => {
                console.error('Error deleting transaction:', error);
            });
    },
    cancelDelete() {
        this.showConfirmModal = false; // Hide the modal without deleting
    },
    openFormForEdit(transaction) {
        this.isInEditMode = true;
        this.showTransactionForm = true;
        this.transactionAmount = transaction.transactionAmount;
        this.transactionCategory = transaction.transactionCategory;
        this.transactionDate = transaction.transactionDate;
        this.transactionDescription = transaction.transactionDescription;
        this.transactionFrequency = transaction.transactionFrequency;
        this.transactionVendor = transaction.transactionVendor;
        this.transactionPaymentMethod = transaction.transactionPaymentMethod;
        this.selectedTransactionId = transaction.transactionId;
        console.log(this.selectedTransactionId)
    },
    resetForm() {
        // Reset form fields
        this.transactionAmount = '';
        this.transactionCategory = '';
        this.transactionDate = '';
        this.transactionDescription = '';
        this.transactionFrequency ='';
        this.transactionVendor = '';
        this.transactionPaymentMethod = '';
        this.showTransactionForm = false;
        this.isInEditMode = false;
        this.selectedTransactionId = null;
    },
    cancelEdit() {
        this.resetForm(); 
    },
    }
}
</script>
<style scoped>
.budgetContainer{
    min-height:100vh;
    background: white;
    flex:1;
    margin-left:300px;
    margin-top:90px;
    position:relative;
}
.plannedpaymentsform{
    margin:1rem;
    border-radius:2rem;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
}
.user-details{
  display:flex;
  flex-wrap: wrap;
  font-size: 21px;
  font-weight: 500;
  justify-content: space-between;
  margin-top:2rem; margin-left:2rem; margin-right:2rem;
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
button{
  width: 100px;
  padding: 8px;
  margin:2rem;
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
.budgetTitle{
    padding:2rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
.budgetLogo{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom:1rem;
}
.budgetLogo i{
    font-size: 28px;
    color: aquamarine;
    margin-right:0.5rem;
}
.budgetLogo h3{
    font-size:24px;
}
.budgetLogo span{
    font-weight:700;
    position:relative;
    color:black
}
.budgetLogo span::before{
    content:"";
    position:absolute;
    left:10;
    bottom:0;
    height:3px;
    width:20px;
    background:linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.budgetTitle p{
    padding-left:3rem;
    padding-right:2rem;
    text-align: center;
    font-size:16px;
}
.budgetNavContainer{
    margin-top:2rem;
    padding:2rem;
    background:#f5f5f5;
    display:flex;
    justify-content: flex-start;
}
.budgetNav{
    display:flex;
    align-items: center;
    padding:1rem;
    margin-right:3rem;
}
.budgetNav h3{
    font-size:24px;
    font-weight:500;
}
.budgetNav i{
    margin-right:0.5rem;
    font-size:26px;
}
.budgetNav:hover{
    background:linear-gradient(65deg, deeppink,coral);
    color:white;
    border-radius:20px;
}
.totalPayment{
    padding:3rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-left:5rem;
    padding-right:5rem;
}
.paymentAmount-container{
    display:flex;
}
.totalPayment i{
    font-size:50px;
}
.totalPayment i:hover{
    color:aquamarine;
    cursor: pointer;
}
.paymentLabel {
    background: #f5f5f5;
    padding: 1rem;
    border: 1px solid #ccc; /* Border color */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Box shadow */
    border-radius: 10px; /* Border radius for rounded corners */
    text-align: center;
    margin-right:2rem;
}
.payment-item{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc; /* Border color */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Box shadow */
    border-radius: 10px; /* Border radius for rounded corners */
    margin-bottom: 0.5rem;
}
.payment-left{
    align-items: center;
}
.payment-left i{
    font-size:26px;
    margin-right:0.5rem;
}
.payment-left strong{
    font-size:24px;
}
.payment-item{
    font-size:20px;
}
.payment-item i{
    margin-right:0.5rem;
}
.transaction-list {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom:0.5rem;
}

.transaction-item {
    margin-bottom: 10px;
    padding: 5px;
    border-bottom: 1px solid #eee;
}

.transaction-item:last-child {
    border-bottom: none;
}

.transaction-item p {
    margin: 0;
}

.transaction-description {
    font-weight: bold;
}

.transaction-amount {
    color: #007bff; /* blue color for amount */
}

.transaction-date {
    color: #999; /* gray color for date */
}
</style>
