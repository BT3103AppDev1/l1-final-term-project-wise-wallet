<template>
    <div class="registrationPage-container">
        <div class="registration_Container">
            <h1>WiseWallet</h1>
            <form action="#">
                <div class="user-details">
                    <div class="input-box">
                        <label class="details">First Name:</label>
                        <input type="text" v-model="firstName" placeholder="Enter first name" required>
                    </div>

                    <div class="input-box">
                        <label class="details">Last Name:</label>
                        <input type="text" v-model="lastName" placeholder="Enter last name" required>
                    </div>
                    <div class="input-box">
                        <label class="details">Email:</label>
                        <input type="text" v-model="userEmail" placeholder="example@gmail.com" required>
                    </div>
                    <div class="input-box">
                        <label class="details">Country:</label>
                        <input type="text" v-model="userCountry" placeholder="Select country" required>
                    </div>
                    <div class="input-box">
                        <label class="details">Password:</label>
                        <input type="text" v-model="userPassword" placeholder="Password" required>
                    </div>
                    <div class="input-box">
                        <label class="details">Confirm Password:</label>
                        <input type="text" v-model="userPassword" placeholder="Re-type Password" required>
                    </div>
                </div>
            </form>
            <div class="checkBox">
                <input type="checkbox">
                <span>I agree to the processing of personal data according to <a href="#">Privacy Policy</a></span>
            </div>
            <div class="checkBox">
                <input type="checkbox">
                <span>I acknowledge my name is correct and corresponds to the government-issued identification</span>
            </div>
            <div class="submitButton">
                <button @click="submit">Submit</button>
            </div>
        </div>
        <div class="tagline_register">
            <h1>
                Every financial journey begins with a budget, 
                no matter your goals.</h1>
                <p>Unlock financial confidence with WiseWallet. No more crossing your fingers with each swipe. Embrace budgeting to take control of your money with ease and empowerment.</p>
                <i class='bx bx-wallet'>Uncover an additional $88 right before your eyes</i><br>
                <i class='bx bxs-credit-card' >Slash your monthly expenses by a remarkable 10%</i><br>
                <i class='bx bx-bed' >Experience 10 times better sleep quality</i>
                <img src='/Users/zhantingtoh/BudgetTracker/src/assets/Picture 1.png'>
        </div>
    </div>
</template>
<style scoped>
.registrationPage-container{
    background:white;

    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;

}
.registration_Container{
    max-width:725px;
    width:50%;
    padding:50px 35px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    margin-right:15rem;
}
.registration_Container h1{
    font-size:25px;
    font-weight:600;
    position:relative;
}
.registration_Container h1::before {
    content:"";
    position:absolute;
    left:10;
    bottom:0;
    height:3px;
    width:30px;
    background:linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.registration_Container form .user-details{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:20px 0 12px 0;
}
.registration_Container form .input-box{
    margin-bottom:15px;
    width:calc(100% / 2 - 20px);
}
.registration_Container form .input-box .details{
    display:block;
    font-weight:500;
    margin-bottom: 5px;
}
.user-details .input-box input {
    height:45px;
    width:100%;
    outline:none;
    border-radius:5px;
    border:1px solid #ccc;
    padding-left:15px;
    font-size:16px;
    border-bottom-width: 2px;
    transition: border-color 0.3s ease
}
.user-details .input-box input:focus,
.user-details .input-box input:valid{
border-color: #9b59b6;
}
.checkBox{
    padding:0.5rem;
}
.checkBox span{
    margin:0.5rem;
}

button {
    width: calc(100% - 10px);
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size:18px;
    font-weight:500;
    letter-spacing: 1px;
    background:linear-gradient(135deg, #71b7e6, #9b59b6)
  }
  
  button:hover {
    background:linear-gradient(-135deg, #71b7e6, #9b59b6)
  }
  .tagline_register {
    width: 50%;
    max-width:725px;
    padding: 40px;
    height: 100vh; /* Set the container height to 100% of viewport height */
    background-color: #ffffff;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center; /* Center the content vertically */
    align-items: center;
}

.tagline_register h1 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.tagline_register p {
    font-size: 20px;
    color: #555;
    margin-bottom: 20px;
}

.tagline_register i {
    font-size: 18px;
    color: #777;
    margin-bottom: 10px;
}

.tagline_register i.bx {
    margin-right: 5px;
    vertical-align: middle;
}

.tagline_register img {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
}
</style>