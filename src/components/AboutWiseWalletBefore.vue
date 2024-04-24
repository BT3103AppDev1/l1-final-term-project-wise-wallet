<template>
    <div class="about-page">
        <div class="header">
            <h1 class="logo_1">About <span class="wise">WiseWallet</span></h1>
        <p>Your Personal Budget Management Solution</p>
      </div>
      <div class="content">
        <div class="section">
          <h2>Our Mission</h2>
          <p>At WiseWallet, our mission is to empower individuals to take control of their finances and achieve their financial goals through smart budgeting and financial management.</p>
        </div>
        <div class="section">
          <h2>What We Offer</h2>
          <p>WiseWallet offers a comprehensive budget management platform that helps you track your income, expenses, and savings effortlessly. With intuitive charts and tools, you can gain insights into your spending habits and make informed financial decisions.</p>
        </div>
        <div class="section">
          <h2>Why Choose WiseWallet?</h2>
          <ul>
            <li>Simple and user-friendly interface</li>
            <li>Track income, expenses, and savings in one place</li>
            <li>Customizable budget categories</li>
            <li>Detailed reports and insights</li>
            <li>Secure and private</li>
          </ul>
        </div>
        <div class="section">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out to us:</p>
          <ul>
            <li>Email: support@wisewallet.com</li>
            <li>Address: 123 Main Street, WiseCity, WC</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .about-page {
    background: white;
    flex:1;
    padding:5rem;
    position:relative;
  }
  
  .header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 36px;
  color: #333;
  position: relative; /* Ensure the positioning context */
}

.header p {
  font-size: 18px;
  color: #666;
}

.logo {
  display: inline-block;
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
  width: 30px; /* Extend the line across the width of the parent */
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
  
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.section p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.section ul {
  list-style-type: disc;
  margin-left: 20px;
}

.section ul li {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}
</style>
  