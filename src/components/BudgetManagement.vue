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
        <div class="budgetBreakdownContainer">
            <div class="totalPayment">
                <div class="salaryShow">
                    <h1>$4,500</h1>
                    <p><i class='bx bx-edit-alt' ></i> Monthly Income</p>
                </div>
                <div class="spendingShow">
                    <div class="paymentLabel">
                        <h1>$700</h1>
                        <p><i class='bx bx-edit-alt' ></i> Monthly Investment</p>
                    </div>
                    <div class="paymentLabel">
                        <h1>$1,800</h1>
                        <p><i class='bx bx-edit-alt' ></i> Monthly Planned Payment</p>
                    </div>
                    <div class="paymentLabel">
                        <h1>$1,000</h1>
                        <p><i class='bx bx-edit-alt' ></i> Monthly Savings</p>
                    </div>
                    <div class="paymentLabel">
                        <h1>$1,000</h1>
                        <p><i class='bx bx-edit-alt' ></i> Monthly Spendings</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="monthlySpendingContainer">
            <h1>Remaining Monthly Budget Allocation: $1,000</h1>
            <i class='bx bx-plus' ></i>
        </div>
        <div class="monthlySpending-items">
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-bowl-rice' ></i>
                    <strong>Food</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$450</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-store-alt' ></i>
                    <strong>Shopping</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$300</p>
            </div>
            <div class="payment-item">
                <div class="payment-left">
                    <i class='bx bx-headphone' ></i>
                    <strong>Miscellaneous</strong>
                </div>
                 <p><i class='bx bx-edit-alt' ></i>$250</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.budgetContainer{
    height:100vh;
    background: white;
    flex:1;
    margin-left:300px;
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
    font-size:50px;
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
</style>