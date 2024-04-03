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
                <h3>Budget overview</h3>
            </div>
            <div class="budgetNav">
                <i class='bx bx-credit-card-alt' ></i>
                <h3>Planned payments</h3>
            </div>
            <div class="budgetNav">
                <i class='bx bx-cog' ></i>
                <h3>Manage your budget</h3>
            </div>
        </div>
        <div class="totalPayment">
            <div class="paymentLabel">
                <h1>$1,800</h1>
                <p>Monthly Scheduled Payment</p>
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
                    <option value="Subscription">Music and Entertainment Subscription</option>
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
              <div v-if="isInEditMode" class="deleteButton"> 
              <button type="button" @click="deleteTransaction(selectedTransaction)">Delete</button> </div>
              <!-- Submit Button -->
              <div class="saveButton">
                <button type ="submit">Submit</button>
              </div>
              
            </form>
        <div class="payment-list">
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-bus' ></i>
                    <strong>Transportation</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$50 (Due: 2024-03-10)</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-shower' ></i>
                    <strong>Utilities Bill</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$150 (Due: 2024-03-15)</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-shield-plus' ></i>
                    <strong>Insurance</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$200 (Due: 2024-03-20)</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-car' ></i>
                    <strong>Car Installment</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$300 (Due: 2024-03-25)</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-building-house' ></i>
                    <strong>Property Mortgage</strong> 
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$1000 (Due: 2024-03-30)</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bxl-spotify' ></i>
                    <strong>Music & Entertainment Subscription</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$100 (Due: 2024-03-30)</p>
            </div>
        </div>
    </div>
</template>
<script>
import {auth, db} from '@/assets/firebase.js';
import {ref, push, onValue, remove, update} from 'firebase/database';
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
        };
    },
    methods:{
        toggleForm(){
            this.showTransactionForm = !this.showTransactionForm;
        },
        saveTransaction() {
            const currentUser = auth.currentUser;
            // Structuring transaction data for reuse in both new and update operations
            const transactionData = {
                transactionAmount: this.transactionAmount,
                transactionCategory: this.transactionCategory,
                transactionDate: this.transactionDate,
                transactionDescription: this.transactionDescription,
                transactionFrequency:this.transactionFrequency,
                transactionVendor: this.transactionVendor,
                transactionPaymentMethod: this.transactionPaymentMethod
            };
            // Adding a new transaction
            const userTransactionsRef = ref(db, `plannedpayments/${currentUser.uid}`);
            push(userTransactionsRef, transactionData).then((data) => {
                alert('New planned payments saved successfully');
            }).catch((error) => {
                console.error('Error saving planned payments:', error);
            });
            this.transactionAmount = '';
            this.transactionCategory = '';
            this.transactionDate = '';
            this.transactionDescription = '';
            this.transactionFrequency ='';
            this.transactionVendor = '';
            this.transactionPaymentMethod = '';
            this.showTransactionForm = !this.showTransactionForm;
        }
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
</style>
