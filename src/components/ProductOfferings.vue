<template>
    <div class="product-offerings">
      <h1><span class="wise">WiseWallet</span> Product Offerings</h1>
      <div class="offerings">
        <!-- Offering 1: Basic -->
        <div class="offering">
          <div class="offering-title">
            <h3>Basic</h3>
            <p>$0 / month</p>
          </div>
          <ul>
            <li>Track Income & Expenses</li>
            <li>Basic Budget Insights</li>
            <li>Customizable Categories</li>
          </ul>
          <button class="btn">Get Started</button>
        </div>
  
        <!-- Offering 2: Pro -->
        <div class="offering">
          <div class="offering-title">
            <h3>Pro</h3>
            <p>$9.99 / month</p>
          </div>
          <ul>
            <li>Track Income & Expenses</li>
            <li>Detailed Budget Insights</li>
            <li>Customizable Categories</li>
            <li>Advanced Reporting</li>
            <li>Premium Support</li>
          </ul>
          <button class="btn">Upgrade Now</button>
        </div>
  
        <!-- Offering 3: Premium -->
        <div class="offering">
          <div class="offering-title">
            <h3>Premium</h3>
            <p>$19.99 / month</p>
          </div>
          <ul>
            <li>Track Income & Expenses</li>
            <li>Detailed Budget Insights</li>
            <li>Customizable Categories</li>
            <li>Advanced Reporting</li>
            <li>Premium Support</li>
            <li>Investment Tracking</li>
            <li>Bill Reminder</li>
          </ul>
          <button class="btn">Upgrade Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .product-offerings {
    background: white;
    flex:1;
    padding:12.5rem;
    margin-left:200px;
    position:relative;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .offerings {
    display: flex;
    padding-top:3rem;
  }
  
  .offering {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-right:5rem;
    width: calc(33.33% - 20px); /* Adjust width for spacing */
  }
  
  .offering-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .offering-title h3 {
    font-size: 20px;
    color: #333;
  }
  
  .offering-title p {
    font-size: 18px;
    color: #666;
  }
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  ul li {
    list-style: none;
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .btn {
    background-color: #5e72e4;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #4158d0;
  }
  .wise {
  position: relative;
}

.wise::after {
  content: '';
  position: absolute;
  left: 5px;
  bottom: 0;
  height: 3px;
  width: 20px; /* Extend the line across the width of the parent */
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
  </style>
  