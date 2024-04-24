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
            <router-link to ='/plannedpayments' class="router-link" style="text-decoration: none; color:inherit">
                <h3>Planned payments</h3>
            </router-link>
        </div>
        <div class="budgetNav">
            <i class='bx bx-cog' ></i>
            <router-link to ='/budgetmanagement' class="router-link" style="text-decoration: none; color:inherit">
                <h3>Manage your budget</h3>
            </router-link>
        </div>
    </div >
    <div class="content-container">
    <div class="budget-tracker">
        <div class="budget-header">
            <span class="budget-title">Total Budget</span>
        </div>
        <div class="budget-details">
            <span class="current-amount">{{ formattedCurrentAmount }}</span>/<span class="total-amount">{{ formattedSalary }}</span>
        </div>
        <div class="progress-bar-background">
            <div class="progress-bar-foreground" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <div class="budget-warning" v-if="this.currentAmount > this.salary">
            You have exceeded your budget!
    </div>
    <div class="chart-container">
    <div class="line-chart" v-if="isLineChartDataAvailable">
    <button @click="exportLineChart('csv')">Export CSV</button>
    <button @click="exportLineChart('pdf')">Export PDF</button>
    <Line :data="lineChartData" :options="lineChartOptions" />
    <button @click="setViewMode('daily')">Show Daily Transactions</button>
    <button @click="setViewMode('monthly')">Show Monthly Transactions</button>
    <button @click="setViewMode('yearly')">Show Yearly Transactions</button>
     </div>
    <div class='historical_compare'>
    <button @click="exportBarChartToCSV">Export to CSV</button>
    <button @click="exportBarChartToPDF">Export to PDF</button>
    <canvas id="hist_Chart"></canvas> </div>
</div>
    </div>
</div>

    <!-- <div class="pie-chart" v-if="isPieChartDataAvailable">
        <button @click="exportPieChart('csv')">Export CSV</button>
        <button @click="exportPieChart('pdf')">Export PDF</button>
        <Pie :data="chartData" :options="chartOptions" />
    </div> -->




    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);
import { onMounted,ref } from 'vue';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import {ref as dbRef, push, onValue, remove, update,get} from 'firebase/database';
import { auth, db } from '@/assets/firebase.js';
import { Pie,Line} from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title, LineElement } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


ChartJS.register(Tooltip, Legend, ArcElement, Title, ChartDataLabels, LineElement);

export default {
    name: 'Charts',
    components: { Pie, Line},
    data() {
        return {
            historicalData: [],
            barChart: null,
            investment: 0,
            payment: 0,
            savings: 0,
            salary: 0,
            transactionData: [],  // Array to store fetched transactions
            lineChartData: {
            labels: [],
            datasets: []},           
            lineChartOptions: {}, // Options for the line chart
            viewMode: 'daily',
            currentAmount: 0 
        };
    },
    computed: {
    isPieChartDataAvailable() {
        return this.chartData.datasets.some(dataset => dataset.data.length > 0 && dataset.data.some(data => data > 0));
    },
    isLineChartDataAvailable() {
        return this.lineChartData.datasets.some(dataset => dataset.data.length > 0 && dataset.data.some(data => data > 0));
    },
    currentAmount() {
        // Sum of investment, payment, and savings
        return this.investment + this.payment + this.savings;
    },
    progressPercentage() {
        if (this.currentAmount > this.salary) {
            return 100
        }
        if (this.salary > 0) {
            return (this.currentAmount / this.salary * 100).toFixed(2);
        }
        return 0;
    },
    formattedCurrentAmount() {
        this.currentAmount = this.investment + this.payment + this.savings
        return this.currentAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    formattedSalary() {
        return this.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },

    chartData() {
      return {
        labels: ['Investment', 'Payment', 'Savings', 'Remaining Budget'],
        datasets: [{
          data: [this.investment, this.payment, this.savings, this.salary - this.investment - this.payment - this.savings],
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
    linechartoptions() {
      return {
        responsive: true,
        maintainAspectRatio: false, // Set this to false to allow custom dimensions
        plugins: {
          datalabels: {
            color: '#fff',
            anchor: 'end',
            align: 'start',
            font: {
              weight: 'bold',
              size: 16,
            },
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value*100 / sum).toFixed(2)+"%";
              return percentage;
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
    
    mounted() {
        this.fetchHistoricalData();
        this.fetchBudgetAmounts();
        this.fetchTransactions();
    },
    methods: {

        toggleViewMode() {
            this.viewMode = this.viewMode === 'daily' ? 'monthly' : 'daily';
            this.fetchTransactions();  // Refetch with the new mode
        },
        setViewMode(mode) {
        this.viewMode = mode;
        this.fetchTransactions();
    },
        
        fetchTransactions() {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userTransactionsRef = dbRef(db, `transactions/${currentUser.uid}`);
                onValue(userTransactionsRef, snapshot => {
            let transactionSum = {};
            snapshot.forEach(childSnapshot => {
                const { transactionDate, transactionAmount } = childSnapshot.val();
                const date = new Date(transactionDate);
                let key;
                switch (this.viewMode) {
                    case 'yearly':
                        key = `${date.getFullYear()}`; // Year key as "YYYY"
                        break;
                    case 'monthly':
                        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Month key as "YYYY-M"
                        break;
                    case 'daily':
                        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Day key as "YYYY-M-D"
                        break;
                }
                transactionSum[key] = (transactionSum[key] || 0) + parseFloat(transactionAmount);
            });
            this.transactionData = Object.entries(transactionSum).map(([date, totalAmount]) => ({ date, totalAmount }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            this.updateLineChartData();
        }, { onlyOnce: true });
    }
},

        updateLineChartData() {
            this.lineChartData = {
                labels: this.transactionData.map(t => t.date),
                datasets: [{
                    label: `${this.viewMode.charAt(0).toUpperCase() + this.viewMode.slice(1)} Transactions`,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 0.8)',
                    data: this.transactionData.map(t => t.totalAmount),
                    fill: false,
                }]
            };
        },
        fetchBudgetAmounts() {
            onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const investmentRef = dbRef(db, `/monthlyInvestment/${uid}`);
                const paymentRef = dbRef(db, `/monthlyPayment/${uid}`);
                const savingsRef = dbRef(db, `/monthlySavings/${uid}`);
                const spendingsRef = dbRef(db, `/monthlySpendings/${uid}`);
                const incomeRef = dbRef(db, `monthlyIncome/${uid}`);
                get(incomeRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.salary = snapshot.val();
                    }
                }) 
                get(investmentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.investment = snapshot.val();
                    } 
                })
                get(paymentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.payment = snapshot.val();
                    } 
                })
                get(savingsRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.savings = snapshot.val();
                    } 
                })
                get(spendingsRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.spendings = snapshot.val();
                    } 
                })
            }
        });
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
        const ctx = document.getElementById('hist_Chart').getContext('2d');
        if (this.barChart) {
            this.barChart.destroy(); // Destroy existing chart to prevent memory leaks
        }
        this.barChart = new ChartJS(ctx, {
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
    exportPieChart(format) {
    if (format === 'csv') {
        // Assume this.chartData.labels are the row headings and this.chartData.datasets[0].data are the corresponding values
        let rows = this.chartData.labels.map((label, index) => [label, this.chartData.datasets[0].data[index]]);
        this.exportCSV(rows, ['Category', 'Amount'], 'pie-chart-data.csv');
    } else if (format === 'pdf') {
        this.exportPDF(this.chartData, 'Pie Chart', 'pie-chart-data.pdf');
    }},

    exportLineChart(format) {
        if (format === 'csv') {
            this.exportCSV(this.lineChartData.datasets[0].data.map((amount, index) => [this.lineChartData.labels[index], amount]), ['Date', 'Amount'], 'line-chart-data.csv');
        } else if (format === 'pdf') {
            this.exportPDF(this.lineChartData, 'Line Chart', 'line-chart-data.pdf');
        }
    },


    exportBarChartToCSV() {
        const labels = this.barChart.data.labels;
        const incomeData = this.barChart.data.datasets[0].data; // Assuming dataset[0] is Income
        const expensesData = this.barChart.data.datasets[1].data; // Assuming dataset[1] is Expenses
        const rows = labels.map((label, index) => [label, incomeData[index], expensesData[index]]);

        this.exportCSV(rows, ['Month', 'Income', 'Expenses'], 'monthly_finances.csv');
    },

    exportBarChartToPDF() {
        const doc = new jsPDF();
        doc.text('Monthly Income vs Expenses', 14, 16);
        const headers = [['Month', 'Income', 'Expenses']];
        const body = this.barChart.data.labels.map((label, index) => [
            label,
            this.barChart.data.datasets[0].data[index],
            this.barChart.data.datasets[1].data[index],
        ]);

        doc.autoTable({
            head: headers,
            body: body,
            startY: 20,
            theme: 'striped'
        });

        doc.save('monthly_finances.pdf');
    },

    exportCSV(data, columns, filename) {
    // Ensure each row of data is an array; if not, wrap it in an array
    let csvContent = columns.join(",") + "\n" + data.map(e => Array.isArray(e) ? e.join(",") : e).join("\n");
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
},

exportPDF(chartData, title, filename) {
        const doc = new jsPDF();
        doc.text(title, 20, 20);
        let body = [];
        if (chartData.labels && chartData.datasets) {
            chartData.labels.forEach((label, index) => {
                const row = [label];
                chartData.datasets.forEach((dataset) => {
                    row.push(dataset.data[index]);
                });
                body.push(row);
            });
        }
        doc.autoTable({
            head: [['Category', 'Amount']],
            body: body
        });
        doc.save(filename);
    }
}

};


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

.chart-container {
    display: flex;
    flex-direction: row;
    padding: auto
}


.line-chart button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 12px;
    color: white;
    background-color: #4158D0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}


.pie-chart button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 12px;
    color: white;
    background-color: #4158D0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.historical_compare button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 12px;
    color: white;
    background-color: #4158D0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.pie-chart button:hover {
    background-color: #293B8F;
    transform: scale(1.05);
}

.pie-chart button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(65, 88, 208, 0.5);
}

.line-chart button:hover {
    background-color: #293B8F;
    transform: scale(1.05);
}

.line-chart button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(65, 88, 208, 0.5);
}

.historical_compare button:hover {
    background-color: #293B8F;
    transform: scale(1.05);
}

.historical_compare button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(65, 88, 208, 0.5);
}

.historical_compare{
  width: 70%;
  height: 380px; /* Adjust height as needed */
  margin-top: px;
  margin:5rem;
}

.line-chart {
    padding: 1rem;
    box-sizing: border-box; /* Ensures that padding is included in the width */
    width: 40vw; /* Takes the full viewport width */
}


.budget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.budget-title {
  font-weight: bold;
  color: #333;
}

.edit-btn {
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn:hover {
  color: #2c3e50;
}

.budget-details {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
}

.current-amount {
  font-weight: bold;
  color: #8e44ad;
}

.total-amount {
  font-weight: normal;
  color: #95a5a6;
}

.progress-bar-background {
  width: 100%;
  background: #ecf0f1;
  border-radius: 1rem;
  height: 1rem;
}

.progress-bar-foreground {
    transition: width 0.5s ease;
    height: 1rem;
    background: linear-gradient(to right, #3498db, #9b59b6);
    border-radius: 1rem;
}

.content-container {
    display: flex;
    flex-direction: row; /* Change this to row to align children side by side */
    align-items: flex-start; /* Aligns children to the start of the cross axis */
    justify-content: space-between; /* This will place space between the children if there's extra space */
    padding: 0;
    margin: 0;
}
.line-chart, .historical_compare {
    flex-grow: 1; /* Allows the chart to grow and fill the space */
    /* Other properties like padding, margin, etc. */
    margin: 1rem; /* Adjust margin as needed to create space between the charts */
}




.budget-tracker {
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  height: 30vh; /* Adjusted height here */
  width: 70vw; /* Takes the full viewport width */
  margin-bottom: 1.5rem
}

.budget-warning {
    color: red;
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
    font-size: 24px;
}


</style>