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
                <router-link to ='/plannedpayments' class="router-link" style="text-decoration: none; color:inherit">
                    <h3>Planned payments</h3>
                </router-link>
            </div>
            <div class="budgetNav">
                <i class='bx bx-cog' ></i>
                <h3>Manage your budget</h3>
            </div>
        </div>
        <div class="budgetBreakdownContainer">
            <div class="totalPayment">
                <div class="salaryShow">
                <h1 v-if="!editSalary">{{ formattedSalary }}</h1>
                <input v-else v-model="editValue" type="text" @blur="finishEdit" @keyup.enter="finishEdit">
                <p><i class='bx bx-edit-alt' v-if="!editSalary" @click="enableEdit"></i>Monthly Income</p>
            </div>
                <div class="spendingShow">  
                    <div class="paymentLabel">
                    <h1 v-if="!editInvestment">{{ formattedInvestment }}</h1>
                    <input v-else v-model="editInvestmentValue" type="text" @blur="finishEditInvestment" @keyup.enter="finishEditInvestment">
                    <p><i class='bx bx-edit-alt' v-if="!editInvestment" @click="enableEditInvestment"></i> Monthly Investment</p>                    
                    </div>

                    <div class="paymentLabel">
                    <h1 v-if="!editPayment">{{ formattedPayment }}</h1>
                    <input v-else v-model="editPaymentValue" type="text" @blur="finishEditPayment" @keyup.enter="finishEditPayment">
                        <p><i class='bx bx-edit-alt' v-if="!editPayment" @click="enableEditPayment" ></i> Monthly Planned Payment</p>
                    </div>
                    <div class="paymentLabel">
                        <h1 v-if="!editSavings">{{ formattedSavings }}</h1>
                    <input v-else v-model="editSavingsValue" type="text" @blur="finishEditSavings" @keyup.enter="finishEditSavings">
                        <p><i class='bx bx-edit-alt' v-if="!editSavings" @click="enableEditSavings" ></i> Monthly Savings</p>
                    </div>
                    <div class="paymentLabel">
                        <h1 v-if="!editSpendings">{{ formattedSpendings }}</h1>
                    <input v-else v-model="editSpendingsValue" type="text" @blur="finishEditSpendings" @keyup.enter="finishEditSpendings">
                        <p><i class='bx bx-edit-alt' v-if="!editSpendings" @click="enableEditSpendings" ></i> Monthly Spendings</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        <div class="monthlySpendingContainer">
            <h1>Remaining Monthly Budget Allocation: {{ formattedBudget }}</h1>
            <i class='bx bx-plus' @click="showModal = true"></i>

        </div>
        <p class="customiseExpensesNote">Click the plus sign on the right to further plan your remaining monthly budget.</p>

        <div class="monthlySpending-items">
  <div class="payment-item" v-for="(item, index) in budgetItems" :key="index">
    <!-- Editing UI -->
    <div v-if="editingItem === item.id">
      <input v-model="editedName" placeholder="Item Name" type="text" />
      <input v-model="editedAmount" placeholder="Amount" type="number" />
      <button @click="editItem">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <!-- Display UI -->
    <div v-else class="payment-display">
      <div class="payment-left">
        <i class='bx bx-cart-add'></i> 
        <strong class="item-name">{{ item.name }}</strong>
        <i class='bx bx-trash' @click="promptDelete(item.id)"></i> 
        </div>
        <ConfirmationModal
        :isVisible="showModalDelete"
        message="Are you sure you want to delete this item?"
        @confirm="confirmDelete"
        @cancel="closeModal"/>
        <div class="payment-right">
        <i class='bx bx-edit-alt' @click="startEditing(item)"></i>
        <p>${{ item.amount }}</p>
      </div>
    </div>

        </div>
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="showModal = false">&times;</span>
                    <h2>Add New Budget Item</h2>
                    <input v-model="newItemName" placeholder="Item Name" type="text" />
                    <input v-model="newItemAmount" placeholder="Amount" type="number" />
                    <button @click="addNewItem">Add Item</button>
                </div>
            </div>
        </div>
        <p class="customiseExpensesNote2">Remaining Budget After Fine Grained Planning: {{finalbudget}}</p>

    </div>
</template>

<script>

import { onAuthStateChanged } from "firebase/auth";
import { get, ref as dbRef, set, push} from "firebase/database";
import { auth, db } from '@/assets/firebase.js';
import ConfirmationModal from './ConfirmationModal.vue';


export default {
    components: {
    ConfirmationModal,
  },

  data() {
    return {
      salary: 0, 
      editSalary: false,
      editValue: '',
      investment: 0, 
      editInvestment: false,
      editInvestmentValue: '',
      payment: 0,
      editPayment: false,
      editPaymentValue: '',
      savings: 0,
      editSavings: false,
      editSavingsValue: '',
      spendings: 0,
      editSpendings: false,
      editSpendingsValue: '',
      remainingBudget: 0,
      budgetItems: [
    ],
    totalBudgetAmount: 0,
    newItemName: '',
    newItemAmount: '',
    showModal: false,
    //for additional budgeted items
    editingItem: null,
    editedName: '',
    editedAmount: 0,
    itemIdToDelete: null,
    showModalDelete: false,

    }

  },
  computed: {
    formattedSalary() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary);
    },
    formattedInvestment() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.investment);
    },
    formattedPayment() {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.payment);
    },
    formattedSavings() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.savings);
    },
    formattedSpendings() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.spendings);
    },
    formattedBudget() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary - this.investment - this.payment - this.savings - this.spendings);
    },
    finalbudget() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary - this.investment - this.payment - this.savings - this.spendings - this.totalBudgetAmount);
    }
  },
  created() {
    this.fetchMonthlyIncomeAndInvestment();
    this.fetchBudgetItems();

  },
  methods: {
    fetchBudgetItems() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const budgetItemsRef = dbRef(db, `users/${uid}/budgetItems`);
        get(budgetItemsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const itemsObj = snapshot.val();
          const itemsArray = [];
          let totalAmount = 0; // Initialize total amount

          Object.entries(itemsObj).forEach(([key, item]) => {
            itemsArray.push({
              id: key,
              ...item
            });
            totalAmount += item.amount; // Sum up the amounts
          });

          this.budgetItems = itemsArray;
          this.totalBudgetAmount = totalAmount; // Update total amount
        } else {
          console.log("No budget items data available.");
          this.budgetItems = [];
          this.totalBudgetAmount = 0; // Reset total amount if no items
        }
      }).catch((error) => {
        console.error("Failed to fetch budget items:", error);
      });
    } else {
      console.log("User not signed in.");
      // Handle user not signed in or redirect to login
    }
  })
},
    
    fetchMonthlyIncomeAndInvestment() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // Fetching Monthly Income
                const incomeRef = dbRef(db, 'users/' + uid + '/monthlyIncome');
                get(incomeRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.salary = snapshot.val();
                    } else {
                        console.log("No monthly income data available. Setting initial value to 0.");
                        this.salary = 0;
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly income:", error);
                });

                // Fetching Monthly Investment
                const investmentRef = dbRef(db, 'users/' + uid + '/monthlyInvestment');
                get(investmentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.investment = snapshot.val();
                    } else {
                        console.log("No monthly investment data available. Setting initial value to 0.");
                        this.investment = 0;
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly investment:", error);
                });
                const paymentRef = dbRef(db, 'users/' + uid + '/monthlyPayment');
                get(paymentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.payment = snapshot.val();
                    } else {
                        console.log("No monthly payment data available. Setting initial value to 0.");
                        this.payment = 0;
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly payment:", error);
                });
                const savingsRef = dbRef(db, 'users/' + uid + '/monthlySavings');
                get(savingsRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.savings = snapshot.val();
                    } else {
                        console.log("No monthly savings data available. Setting initial value to 0.");
                        this.savings = 0;
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly savings:", error);
                });
                const spendingsRef = dbRef(db, 'users/' + uid + '/monthlySpendings');
                get(spendingsRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.spendings = snapshot.val();
                    } else {
                        console.log("No monthly spending data available. Setting initial value to 0.");
                        this.spendings = 0;
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly spendings:", error);
                });
            } else {
                console.log("User not signed in.");
            }
        });
    },
    enableEdit() {
      this.editSalary = true;
      this.editValue = this.salary.toString();
    },
    finishEdit() {
      const parsedValue = parseFloat(this.editValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        this.salary = parsedValue;
        this.updateMonthlyIncome(parsedValue);
      }
      this.editSalary = false;
    },
    updateMonthlyIncome(income) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const incomeRef = dbRef(db, 'users/' + uid + '/monthlyIncome');
          set(incomeRef, income).then(() => {
            console.log("Monthly income updated successfully.");
          }).catch((error) => {
            console.error("Failed to update monthly income:", error);
          });
        }
      });
    },
    enableEditInvestment() {
      this.editInvestment = true;
      this.editInvestmentValue = this.investment.toString();
    },
    finishEditInvestment() {
      const parsedValue = parseFloat(this.editInvestmentValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        this.investment = parsedValue;
        this.updateMonthlyInvestment(parsedValue); 
      }
      this.editInvestment = false;
    },

    updateMonthlyInvestment(investment) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const investmentRef = dbRef(db, 'users/' + uid + '/monthlyInvestment');
          set(investmentRef, investment).then(() => {
            console.log("Monthly investment updated successfully.");
          }).catch((error) => {
            console.error("Failed to update monthly investment:", error);
          });
        }
      });

  },
  enableEditPayment() {
      this.editPayment = true;
      this.editPaymentValue = this.payment.toString();
    },
    finishEditPayment() {
      const parsedValue = parseFloat(this.editPaymentValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        this.payment = parsedValue;
        this.updateMonthlyPayment(parsedValue); 
      }
      this.editPayment = false;
    },

    updateMonthlyPayment(payment) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const paymentRef = dbRef(db, 'users/' + uid + '/monthlyPayment');
          set(paymentRef, payment).then(() => {
            console.log("Monthly payment updated successfully.");
          }).catch((error) => {
            console.error("Failed to update monthly payment:", error);
          });
        }
      });

  },
  enableEditSavings() {
      this.editSavings = true;
      this.editSavingsValue = this.savings.toString();
    },
    finishEditSavings() {
      const parsedValue = parseFloat(this.editSavingsValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        this.savings = parsedValue;
        this.updateMonthlySavings(parsedValue); 
      }
      this.editSavings = false;
    },

    updateMonthlySavings(savings) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const savingsRef = dbRef(db, 'users/' + uid + '/monthlySavings');
          set(savingsRef, savings).then(() => {
            console.log("Monthly savings updated successfully.");
          }).catch((error) => {
            console.error("Failed to update monthly savings:", error);
          });
        }
      });

  },
  cancelEdit() {
    this.editedName = '';
    this.editedAmount = 0;
    this.editingItem = null; 
  },

  enableEditSpendings() {
      this.editSpendings = true;
      this.editSpendingsValue = this.spendings.toString();
    },
    finishEditSpendings() {
      const parsedValue = parseFloat(this.editSpendingsValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        this.spendings = parsedValue;
        this.updateMonthlySpendings(parsedValue); 
      }
      this.editSpendings = false;
    },

    updateMonthlySpendings(spendings) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const spendingsRef = dbRef(db, 'users/' + uid + '/monthlySpendings');
          set(spendingsRef, spendings).then(() => {
            console.log("Monthly spendings updated successfully.");
          }).catch((error) => {
            console.error("Failed to update spendings savings:", error);
          });
        }
      });
    },
    addNewItem() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const newItem = {
          name: this.newItemName,
          amount: parseInt(this.newItemAmount, 10)
        };

        // Create a new reference for a budget item with a unique key
        const newItemRef = push(dbRef(db, `users/${uid}/budgetItems`));
        set(newItemRef, newItem).then(() => {
          console.log("New budget item added successfully.");
          this.fetchBudgetItems(); 
          this.newItemName = '';
          this.newItemAmount = '';
          this.showModal = false; 
        }).catch((error) => {
          console.error("Failed to add new budget item:", error);
        });
      } else {
        console.log("User not signed in. Redirecting to login.");
      }
    });
  },

  calculateFinalBudget() {
        const finalbudget = finalbudget()
        console.log(finalbudget)
        this.$emit('budget-status-updated', finalBudget < 0);
    },

  startEditing(item) {
    this.editingItem = item.id;
    this.editedName = item.name;
    this.editedAmount = item.amount;
  },
  editItem() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // Assuming `editingItem` holds the ID of the item being edited
      if (!this.editingItem) {
        console.error("No item selected for editing.");
        return;
      }
      
      const updatedItem = {
        name: this.editedName,
        amount: parseInt(this.editedAmount, 10)
      };

      // Update the reference for the existing budget item
      const itemRef = dbRef(db, `users/${uid}/budgetItems/${this.editingItem}`);
      set(itemRef, updatedItem).then(() => {
        console.log("Budget item updated successfully.");
        this.fetchBudgetItems(); // Refresh the list of budget items
        // Reset the editing state
        this.editingItem = null;
        this.editedName = '';
        this.editedAmount = '';
      }).catch((error) => {
        console.error("Failed to update budget item:", error);
      });
    } else {
      console.log("User not signed in. Redirecting to login.");
      // Optionally, redirect to login or handle the case of not being signed in
    }
  });
},
deleteItem(itemId) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const itemRef = dbRef(db, `users/${uid}/budgetItems/${itemId}`);

        set(itemRef, null) 
          .then(() => {
            console.log("Item deleted successfully.");
            this.fetchBudgetItems();
          })
          .catch((error) => {
            console.error("Failed to delete item:", error);
          });
      } else {
        console.log("User not signed in. Cannot delete item.");
      }
    });
  },
  promptDelete(itemId) {
      this.showModalDelete = true;
      this.itemIdToDelete = itemId;
    },
    confirmDelete() {
      this.deleteItem(this.itemIdToDelete);
      this.closeModal();
    },
    closeModal() {
      this.showModalDelete = false;
      this.itemIdToDelete = null;
    },
  },
}
</script>

<style scoped>
.budgetContainer{
    height:100vh;
    background: white;
    flex:1;
    margin-left:300px;
    margin-top:90px;
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
    display:flex;
    padding:2rem;
}
.salaryShow {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Align content vertically to the center */
    align-items: center; /* Align content horizontally to the center */
    background-color: #f5f5f5;
    padding: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width:20%;
    margin-left:10rem;
}
.spendingShow{
    background:red;
    background-color: #f5f5f5;
    padding: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-left:2rem;
    text-align: left;
}
.spendingShow h1{
    font-size:22px;
}
.paymentLabel{
    margin-bottom:1rem;
}
.monthlySpendingContainer{
    padding:2rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
}
.monthlySpendingContainer i{
    font-size:30px;
}
.monthlySpendingContainer i:hover{
    color:aquamarine;
    cursor: pointer;
}
.monthlySpendingContainer h1{
    font-size:24px;
    font-weight:600;
}

.monthlySpending-items{
    margin-top:2rem;
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
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.customiseExpensesNote {
    margin-top: 1rem; 
    margin-left: 2rem;
    text-align: left; 
    color: #666; 
    font-size: 16px; 
}
.customiseExpensesNote2 {
    margin-top: 1rem; 
    text-align: center; 
    color: #000000; 
    font-size: 20px; 
    padding-bottom: 10px;
}

input[type="text"] {
  font-size: 16px; 
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: calc(100% - 22px); 
  box-sizing: border-box; 
  margin-bottom: 10px; 
  transition: border-color 0.3s, box-shadow 0.3s; 
}

input[type="text"]:focus {
  border-color: #007bff; 
  box-shadow: 0 0 0 2px rgba(0,123,255,.25); 
  outline: none;
}

input[type="number"] {
  font-size: 16px; 
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: calc(100% - 22px); 
  box-sizing: border-box; 
  margin-bottom: 20px; 
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="number"]:focus {
  border-color: #007bff; 
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25); 
  outline: none; 
}

button {
  font-size: 16px;
  padding: 10px 15px; 
  background-color: #007bff;
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
  margin: 0 5px;
}

button:hover {
  background-color: #0056b3; 
}

.payment-display {
    display: flex;
    justify-content: space-between; 
    width: 100%; 
}

.payment-left {
    display: flex;
}

.payment-right {
    display: flex;
    align-items: center; 
    
}
.item-name {
    margin-left: 2px;
    margin-right: 10px;
}


</style>