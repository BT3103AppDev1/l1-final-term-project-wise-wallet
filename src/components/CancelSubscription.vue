<template>
    <div class="cancel-subscription">
      <h1>How to Cancel Your <span class="wise">WiseWallet</span> Subscription</h1>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-description">
            <h3>Open WiseWallet Website</h3>
            <p>Visit the WiseWallet website and log in to your account.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-description">
            <h3>Go to Account Settings</h3>
            <p>Click on your profile icon and select "Account Settings".</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-description">
            <h3>Manage Subscription</h3>
            <p>In the Account Settings page, navigate to the Subscription section.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-description">
            <h3>Cancel Subscription</h3>
            <p>Find the option to cancel your subscription and follow the instructions.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .cancel-subscription {
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
  
  .steps {
    display: flex;
    flex-wrap: wrap;
    padding-top:3rem;
  }
  
  .step {
    display: flex;
    padding-top:2rem;
    margin-bottom: 30px;
    width: 50%;
  }
  
  .step-number {
    background-color: #5e72e4;
    color: white;
    font-size: 24px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .step-description {
    margin-left: 20px;
  }
  
  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
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
  