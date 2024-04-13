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
    <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { onMounted, ref } from 'vue';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { get, ref as dbRef} from "firebase/database";
import { auth, db } from '@/assets/firebase.js';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Tooltip, Legend, ArcElement, Title, ChartDataLabels);

export default {
    name: 'PieChart',
    components: { Pie },
    data() {
        return {
            investment: 0,
            payment: 0,
            savings: 0,
            spendings: 0,

        };
    },
    computed: {
    chartData() {
      return {
        labels: ['Investment', 'Payment', 'Savings', 'Spendings'],
        datasets: [{
          data: [this.investment, this.payment, this.savings, this.spendings],
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
        this.fetchBudgetAmounts();
    },
    methods: {
        fetchBudgetAmounts() {
            onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const investmentRef = dbRef(db, 'users/' + uid + '/monthlyInvestment');
                const paymentRef = dbRef(db, 'users/' + uid + '/monthlyPayment');
                const savingsRef = dbRef(db, 'users/' + uid + '/monthlySavings');
                const spendingsRef = dbRef(db, 'users/' + uid + '/monthlySpendings');
                get(investmentRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.investment = snapshot.val();
                        console.log(this.investment)
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
  height: 400px;

}


</style>