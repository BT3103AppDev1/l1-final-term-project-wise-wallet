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
            <i class='bx bx-plus' ></i>
        </div>
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
