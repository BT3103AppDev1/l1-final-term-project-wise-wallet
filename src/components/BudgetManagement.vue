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
              <div v-if="isChartDataAvailable" class="chart-container">
                  <Pie :data="chartData" :options="chartOptions" />  
                </div>
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
                        <p> Monthly Planned Payment</p>
                    </div>
                    <div class="paymentLabel">
                        <h1 v-if="!editSavings">{{ formattedSavings }}</h1>
                    <input v-else v-model="editSavingsValue" type="text" @blur="finishEditSavings" @keyup.enter="finishEditSavings">
                        <p><i class='bx bx-edit-alt' v-if="!editSavings" @click="enableEditSavings" ></i> Monthly Savings</p>
                    </div>
                    <div class="paymentLabel">
                        <h1>{{ formattedSpendings }}</h1>
                        <p> Remaining Monthly Budget</p>
                    </div>
                </div>
                <div class="historical_compare">
                  <canvas id = 'budgetChart'></canvas>
                </div>
                <!--
                <div  class='historical_compare'>
                  <canvas id="barChart"></canvas>
                </div>
                -->
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
      <input v-model="editedName" placeholder="Item Name" type="option" />
      <input v-model="editedAmount" placeholder="Amount" type="number" />
      <button @click="editItem">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <!-- Display UI -->
    <div v-else class="payment-display">
      <div class="payment-left">
        <div :class="['transaction-icon', categoryIconMap[item.name]]"></div>
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
                    <select class="category-select" v-model="newItemName" placeholder="Item Name">
                    <option value="">Choose Category</option>
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
                      <!-- Add other categories here -->
                    </select>
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
import { get, onValue, ref as dbRef, set, push} from "firebase/database";
import { auth, db } from '@/assets/firebase.js';
import ConfirmationModal from './ConfirmationModal.vue';
import { Pie } from 'vue-chartjs'
import Chart from 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';

export default {
  name: 'PieChart',
  components: {
    ConfirmationModal,
    Pie
  },
  data() {
    return {
      historicalData: [],
      transactionData:[],
      barChart: null,
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
    categoryIconMap: {
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
        // Add more mappings for other transaction categories as needed
        }
    }

  },
  computed: {
    isChartDataAvailable() {
        return this.chartData.datasets[0].data.some(data => data > 0);
    },
    isBarChartDataAvailable() {
      return this.historicalData.some(data => data.income > 0 || data.expenses > 0);
  },
    formattedSalary() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary);
    },
    formattedInvestment() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.investment);
    },
    formattedPayment() {
            // Filter transactions based on frequency
            const filteredTransactions_monthly = this.transactionData.filter(transaction => transaction.transactionFrequency === 'Monthly');
            // Calculate total amount for filtered transactions
            const totalAmount_monthly = filteredTransactions_monthly.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
            const filteredTransactions_semi = this.transactionData.filter(transaction => transaction.transactionFrequency === 'Semi-annual');
            const totalAmount_semi = filteredTransactions_semi.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
            const filteredTransactions_annual = this.transactionData.filter(transaction => transaction.transactionFrequency === 'Annual');
            const totalAmount_annual = filteredTransactions_annual.reduce((total, transaction) => total + parseFloat(transaction.transactionAmount), 0);
            this.payment = totalAmount_monthly + totalAmount_semi / 6 + totalAmount_annual / 12
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.payment);
    },
    formattedSavings() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.savings);
    },
    formattedSpendings() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary - this.investment - this.payment - this.savings);
    },
    formattedBudget() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary - this.investment - this.payment - this.savings);
    },
    finalbudget() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.salary - this.investment - this.payment - this.savings - this.totalBudgetAmount);
    },
    chartData() {
      return {
        labels: ['Investment', 'Payment', 'Savings', 'Remaining Budget'],
        datasets: [{
          data: [this.investment.toFixed(2), this.payment.toFixed(2), this.savings.toFixed(2), (this.salary - this.investment - this.payment - this.savings).toFixed(2)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1,
        }]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          datalabels: {
            color: '#fff',
            anchor: 'end',
            align: 'start',
            font: {
              weight: 'bold',
              size: 16,
            },
          },
          legend: {
          },
          title: {
            display: true,
            text: 'Monthly Budget Overview',
          },
        }
      };
    }
  },
  created() {
    this.fetchMonthlyIncomeAndInvestment();
    this.fetchBudgetItems();

  },
  mounted() {
    this.fetchHistoricalData();
    this.renderBudgetChart();
    const currentUser = auth.currentUser;
    const userTransactionsRef = dbRef(db, `plannedpayments/${currentUser.uid}`);
    onValue(userTransactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data){
            this.transactionData = Object.values(data);
        }
    });
  },
  methods: {
      async renderBudgetChart(){
        const currentUser = auth.currentUser;
        const userTransactionsRef = dbRef(db, `transactions/${currentUser.uid}`);
        const userBudgetRef = dbRef(db, `budgetItems/${currentUser.uid}`);
        try {

        // Get current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based  
        // Fetch user's transactions and budget items
        const transactionsSnapshot = await get(userTransactionsRef);
        const budgetSnapshot = await get(userBudgetRef);

        const transactions = transactionsSnapshot.val();
        const budgetItems = budgetSnapshot.val();

        // Filter transactions for the current month
        const currentMonthTransactions = {};
        if (transactions) {
          for (const transactionId in transactions) {
            const transaction = transactions[transactionId];
            const transactionDate = new Date(transaction.transactionDate);
            const transactionMonth = transactionDate.getMonth() + 1; // Months are zero-based
            if (transactionMonth === currentMonth) {
              currentMonthTransactions[transactionId] = transactionId;
            }
          }
        }
        // Prepare data for chart
        const labels = [];
        const plannedData = [];
        const spentData = [];

        for (const itemId in budgetItems) {
          labels.push(budgetItems[itemId].name); // Use name instead of ID
          plannedData.push(budgetItems[itemId].amount);

          let spentAmount = 0;
          if (transactions) {
            for (const transactionId in currentMonthTransactions) {
              const transaction = transactions[transactionId];
              if (transaction.transactionCategory === budgetItems[itemId].name) {
              spentAmount += Math.abs(parseFloat(transaction.transactionAmount));
              }
            }
          }
          spentData.push(spentAmount.toFixed(2)); // Convert to 2 decimal places
        }
        labels.push('Investments')
        plannedData.push(this.investment)
        let spentAmount = 0;
          if (transactions) {
            for (const transactionId in currentMonthTransactions) {
              const transaction = transactions[transactionId];
              if (transaction.transactionCategory === 'Investments') {
              spentAmount += Math.abs(parseFloat(transaction.transactionAmount));
              }
            }
          }
        spentData.push(spentAmount.toFixed(2));
        const ctx = document.getElementById('budgetChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Planned Amount',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: plannedData,
              },
              {
                label: 'Spent Amount',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: spentData,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Monthly Financial Overview: Budget Goals vs. Spending',
                font: {
                  size: 16,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value; // Add currency symbol to y-axis labels
                  }
                }
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
      fetchHistoricalData() {
      const currentUser = auth.currentUser;
      const userTransactionsRef = dbRef(db, `transactions/${currentUser.uid}`);

      onValue(userTransactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactions = Object.values(data);

          // Group transactions by month and calculate total income and expenses for each month
          const groupedData = {};
          transactions.forEach(transaction => {
            const monthYear = transaction.transactionDate.substring(0, 7); // Extract month and year (e.g., "2024-04")
            if (!groupedData[monthYear]) {
              groupedData[monthYear] = { monthYear, income: 0, expenses: 0 };
            }
            if (transaction.transactionCategory === 'Income' || transaction.transactionCategory === 'Salary') {
              groupedData[monthYear].income += parseFloat(transaction.transactionAmount);
            } else {
              groupedData[monthYear].expenses += parseFloat(transaction.transactionAmount);
            }
          });

          // Convert grouped data to array format for Chart.js
          this.historicalData = Object.values(groupedData);

          // Sort historical data by month sequence
          this.historicalData.sort((a, b) => {
            return new Date(a.monthYear) - new Date(b.monthYear);
          });

          // Call method to create bar chart
          this.createBarChart();
        }
      });
    },
    createBarChart() {
      if (!this.isBarChartDataAvailable) {
      if (this.barChart) {
        this.barChart.destroy();  // Destroy the existing chart if any
        this.barChart = null;
      }
      return;  // Exit the method if no data available
    }
      const ctx = document.getElementById('barChart').getContext('2d');
      if (this.barChart) {
        this.barChart.destroy(); // Destroy existing chart to prevent memory leaks
      }
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.historicalData.map(data => data.monthYear),
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderWidth: 1,
              data: this.historicalData.map(data => data.income)
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderWidth: 1,
              data: this.historicalData.map(data => Math.abs(data.expenses))
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: false,
              grid: {
                display: false
              }
            },
            y: {
              stacked: false,
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return '$' + Math.abs(value).toLocaleString();
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Monthly Income vs Expenses',
              padding: {
                top: 20
              }
            }
          }
        }
      });
    },
    fetchBudgetItems() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const budgetItemsRef = dbRef(db, `budgetItems/${uid}`);
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
                const incomeRef = dbRef(db, `monthlyIncome/${uid}`);
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
                const investmentRef = dbRef(db, `monthlyInvestment/${uid}`);
                get(investmentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.investment = snapshot.val();
                    } else {
                        console.log("No monthly investment data available. Setting initial value to 0.");
                    }
                }).catch((error) => {
                    console.error("Failed to fetch monthly investment:", error);
                });
                const paymentRef = dbRef(db, `monthlyPayment/${uid}`);
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
                const savingsRef = dbRef(db, `monthlySavings/${uid}`);
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
                const spendingsRef = dbRef(db, `monthlySpendings/${uid}`);
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
          const incomeRef = dbRef(db, `monthlyIncome/${uid}`);
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
          const investmentRef = dbRef(db, `monthlyInvestment/${uid}`);
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
          const paymentRef = dbRef(db, `monthlyPayment/${uid}`);
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
          const savingsRef = dbRef(db, `monthlySavings/${uid}`);
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
          const spendingsRef = dbRef(db, `monthlySpendings/${uid}`);
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
        const newItemRef = push(dbRef(db, `budgetItems/${uid}`));
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
      const itemRef = dbRef(db, `/budgetItems/${uid}/${this.editingItem}`);
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
        const itemRef = dbRef(db, `/budgetItems/${uid}/${itemId}`);

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
    width:15%;
    margin-left:3rem;
}
.spendingShow{
    background:red;
    background-color: #f5f5f5;
    padding: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-left:2rem;
    margin-right:5rem;
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
.payment-left i, .transaction-icon{
    font-size:26px;
    margin-right:0.5rem;
}
.payment-left strong{
    font-size:24px;
}
.payment-item{
    font-size:20px;
}
.payment-item i, .transaction-icon{
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

input[type="text"],select {
  font-size: 16px; 
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: calc(100% - 22px); 
  box-sizing: border-box; 
  margin-bottom: 10px; 
  transition: border-color 0.3s, box-shadow 0.3s; 
}

input[type="text"]:focus, select{
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
.chart-container{
  margin:1rem;
}
.historical_compare{
  position: relative;
  width: 40%;
  height: 400px; /* Adjust height as needed */
  margin-top: 20px;
  margin:1rem;
}
.bx-trash, .bx-edit-alt{
  cursor:grab
}
</style>