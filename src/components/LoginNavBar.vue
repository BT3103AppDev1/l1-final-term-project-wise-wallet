<template>
<div class="navigationContainer">
    <div class="sidebar">
        <router-link to ='/myBudget' class="router-link" style="text-decoration: none;">
        <div class="sidebar-item">
            <i class='bx bx-wallet' ></i>
                <div class="profileInfo">
                    <a>My Budget</a>
                </div>
        </div>
        </router-link>
        <router-link to ='/myExpenses' class="router-link" style="text-decoration: none;">
        <div class="sidebar-item">
            <i class='bx bxs-plane-take-off' ></i>
                <div class="profileInfo">
                    <a>My Expenses</a>
                </div>
        </div>
        </router-link>
        <router-link to ='/myProfile' class="router-link" style="text-decoration: none;">
        <div class="sidebar-item">
            <i class='bx bxs-user-detail' ></i>
                <div class="profileInfo">
                    <a>My Profile</a>
                </div>
        </div>
        </router-link>
        <router-link to ='/customer-support-after' class="router-link" style="text-decoration: none;">
        <div class="sidebar-item">
            <i class='bx bx-help-circle' ></i>
                <div class="profileInfo">
                    <a>Customer Support</a>
                </div>
        </div>
        </router-link>
        <router-link to='/forum' class="router-link" style="text-decoration: none;">
        <div class="sidebar-item">
            <i class='bx bx-group'></i>
            <div class="profileInfo">
            <a>Forum Page</a>
            </div>
        </div>
        </router-link>
    </div>
    <div class="loginNavBar">
        <a href="#" class="logo">WiseWallet</a>
        <div class="noti">
        <input type = "checkbox" id="checkProfile">
        <label for = "checkProfile" class="icons">
            <i class='bx bx-user-circle'></i>
        </label>
        <div class="notification" v-if="showNotification">
             <i class="bx bx-bell"></i>
             <span class="alert-message">Expenses exceeded income!</span>
        </div>
        <nav class="navItems1">
            <div class="profileStuff">
                <i class='bx bx-user-circle'></i>
                <div class="profileInfo">
                    <h3 id = "displayName"></h3>
                    <p id = 'userEmail'>LimAhBeng@gmail.com</p>
                </div>
            </div>
            <div class="profileStuff">
                <i class='bx bx-user'></i>
                <div class="profileInfo">
                    <h3>My Profile</h3>
                    <p>Account settings and more</p>
                </div>
            </div>
            <div class="profileStuff">
                <i class='bx bx-money-withdraw'></i>
                <div class="profileInfo">
                    <h3>Billing</h3>
                    <p>Billing & statements</p>
                </div>
            </div>
            <div class="profileStuff">
                <i class='bx bx-cog' ></i>
                <div class="profileInfo">
                    <h3>Personalisation</h3>
                    <p>Personalisation options</p>
                </div>
            </div>
            <div class="logOutButton">
                <button @click="logOut">Log Out</button>
            </div>
    </nav>
    </div>
    </div>
    </div>
</template>
<script>
import {auth, db} from '@/assets/firebase.js';
import {ref,onValue} from 'firebase/database';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
export default {
    mounted() {
        const currentUser = auth.currentUser;
        // Update the email
        document.getElementById('displayName').innerText = currentUser.displayName;
        document.getElementById('userEmail').innerText = currentUser.email;
    },
    props: {
    isBudgetNegative: {
        type: Boolean,
        default: false
    }
    },
    data() {
        return {
        showNotification: false,
        totalExpensesForMonth: 0,
        totalIncomeForMonth: 0,
        transactionData: [], // Initialize transactionData array
        currentUser: null
    };
    },
    mounted() {
    // Fetch and calculate total expenses and total income when the component is mounted
    this.fetchTransactionData();
    },
    methods:{
        fetchTransactionData() {
        const currentUser = auth.currentUser;
        const userTransactionsRef = ref(db, `transactions/${currentUser.uid}`);

        onValue(userTransactionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.transactionData = Object.values(data); // Assign transaction data to the component's property
                this.calculateTotalExpensesForMonth(); // Calculate total expenses for the month after fetching transaction data
                this.calculateTotalIncomeForMonth();
                this.checkNotification(); // Check notification after both expenses and income are calculated
            }
        });
    },
    calculateTotalExpensesForMonth() {
        // Check if transactionData is available
        if (this.transactionData.length > 0) {
            // Calculate total expenses for the month using this.transactionData
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;

            // Filter transactions for the current month and exclude transactions categorized as 'Salary' and 'Income'
            const currentMonthExpenses = this.transactionData.filter(transaction => {
                const transactionDate = new Date(transaction.transactionDate);
                return (
                    transactionDate.getMonth() + 1 === currentMonth &&
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
    calculateTotalIncomeForMonth() {
        // Check if transactionData is available
        if (this.transactionData.length > 0) {
            // Calculate total income for the month using this.transactionData
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;

            // Filter transactions for the current month and include only transactions categorized as 'Income'
            const currentMonthIncome = this.transactionData.filter(transaction => {
                const transactionDate = new Date(transaction.transactionDate);
                return (
                    transactionDate.getMonth() + 1 === currentMonth &&
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
    checkNotification() {
      // Check if total expenses exceed total income
      if (parseFloat(this.totalExpensesForMonth) > parseFloat(this.totalIncomeForMonth)) {
        // Show notification if expenses exceed income
        this.showNotification = true;
      } else {
        // Hide notification if expenses are within or below income
        this.showNotification = false;
      }
    },
        logOut(){
            auth.signOut()
            .then(() => {
            // Sign-out successful.
            console.log("User logged out successfully");
            alert("User logged out successfully")
            this.$router.push('/')
        })
        .catch((error) => {
        // An error happened.
            console.error("Error logging out:", error);
        });
        }
    }
}
</script>
<style>
.sidebar {
    width: 300px;
    height: 100%;
    background: linear-gradient(to top, #09203f 0%, #C3B1E1 100%);
    position: fixed;
    padding:5rem;
    z-index:90;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Align items vertically centered */
}
.sidebar-item {
    margin-bottom: 3rem;
    padding:1.5rem;
    display:flex;
    align-items: center;
    border-radius: 10px;
    background: white;
}
.sidebar-item i{
    margin-right:1rem;
    font-size: 30px;
}

.sidebar-item a {
    text-decoration: none;
    font-size: 20px;
    color: #333; /* Sidebar item text color */
    font-weight: bold;
}
.sidebar-item:hover{
    cursor:pointer;
    background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.sidebar-item:hover i {
    color: aquamarine; /* Change icon color on hover */
}

.sidebar-item:hover a {
    color: white; /* Change link text color on hover */
}

.loginNavBar{
    width: 100%;
    top:0; left:0;
    padding:1.3rem 3rem;
    position: fixed;
    display:flex;
    justify-content: space-between;
    align-items: center;
    z-index:100;
    background: black;
}
.noti{
    display: flex;
    align-items: center;
}
.logo{
    font-size:2rem;
    color:#fff;
    text-decoration: none;
    font-weight: 700;
    position:relative
}
.logo::after {
    content: '';
    position: absolute;
    left:0;
    bottom:0;
    height: 3px;
    width: 30px; /* Extend the line across the width of the parent */
    background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.loginNavBar .icons{
    display: flex;
    align-items: center; /* Align items vertically */
}

#checkProfile{
    display: none;
}
.bx-bell{
    color:white;
    font-size: 2.8rem;
}
.loginNavBar .navItems1{
    position:absolute;
        top:100%;
        right:0;
        max-height: 0; /* Initially hide the nav items */
        width:700px;
        padding:0 rem;
        z-index: 110;
        background: rgba(0,0,0,.1);
        backdrop-filter: blur(70px);
        overflow: hidden;
        transition: max-height 0.3s ease; /* Transition max-height property */

}
#checkProfile:checked ~ .navItems1 {
    max-height: 750px; /* Show the nav items by adjusting max-height */
}
.logOutButton{
    text-align: center;
    padding:1.5rem;
}
.logOutButton button {
    color: white;
    cursor:pointer;
    width:500px;
    height:75px;
    padding:0.5rem 1.5rem;
    background:linear-gradient(65deg, deeppink,coral);
    border:white;
    border-radius: 5rem;
    transition:0.2s linear;
    font-size: 20px;
}
.logOutButton button:hover{
    background: white;
    color:black;
}
.profileStuff {
    display: flex;
    align-items: center; /* Align items vertically */
    margin-bottom: 1.5rem;
    margin: 2rem;
}

.profileStuff i {
    font-size: 40px; /* Adjust icon size */
    margin-right: 1.5rem; /* Add spacing between icon and text */
}

.profileInfo {
    display: flex;
    flex-direction: column; /* Display children vertically */
}

.profileInfo h3,
.profileInfo p {
    margin: 0; /* Remove default margins */
    font-size: 30px;
}
.notification {
  display: flex;
  align-items: center;
  background-color: #f44336; /* Red color for danger/alert */
  color: white;
  padding: 10px;
  border-radius: 5px;
  animation: fadeInUp 1s ease; /* Example animation */
  margin-left:2rem; margin-right:2rem;
}

.notification .bx {
  margin-right: 5px;
}

.alert-message {
  font-weight: bold;
}

/* Example fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>