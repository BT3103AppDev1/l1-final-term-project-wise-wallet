<template>
    <div class="LoginForm Container">
        <div class="LoginMainPage">
            <h1>WiseWallet</h1><br>
            <h2>Reset Password</h2>
            <form @submit.prevent="forgetPassword">
                <div class="user-details">
                    <div class="input-box">
                        <label class="details">E-mail:</label>
                        <input type="text" v-model="userEmail" placeholder="Type your email here." required>
                    </div>
                    <div class="submitButton">
                <button type ="submit">Submit</button>
            </div>
            <div class="DontHave">
                <span>Don't have an Account?</span>
                <router-link to ='/registration' class="router-link">Register</router-link>
            </div>
            </div>
            </form>
        </div>
    </div>
</template>
<script>
import { sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '@/assets/firebase.js';
export default {
  data() {
    return {
      userEmail: ''
    };
  },
  methods: {
    forgetPassword() {
      sendPasswordResetEmail(auth, this.userEmail)
        .then(() => {
          // Password reset email sent successfully
          console.log('Password reset email sent successfully.');
          // Optionally, inform the user that the email has been sent
          alert("Password reset email sent successfully. Check your inbox.");
          this.$router.push('/login');
        })
        .catch((error) => {
          // Handle errors
          const errorMessage = error.message;
          console.error('Error sending password reset email:', errorMessage);
          // Optionally, display an error message to the user
          alert("Invalid Email");
        });
      
      // Reset the email field after sending the email
      this.userEmail = '';
    }
  }
};
</script>
<style scoped>
.LoginForm{
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height:100vh;
    background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.LoginMainPage{
    max-width:700px;
    width:100%;
    margin-right: 1rem;
    margin-left:1rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
.LoginMainPage h1{
    position:relative;
    margin:1.5rem;
}
.LoginMainPage h1::before {
    content:"";
    position:absolute;
    left:10;
    bottom:0;
    height:3px;
    width:30px;
    background:linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
br{
    display:block;
    content:"";
    margin-top:10px;
    border-top:1px solid #ccc;
    width:100%
}
.LoginMainPage h2{
    padding:1.5rem;
    text-align:center;
    color:#4158D0;
}
.LoginMainPage form .user-details{
    justify-content: space-between;
    margin-right: 1.5rem;
    margin-left:1.5rem;
}
.LoginMainPage form .input-box{
    margin-bottom:15px;
    width:100%;
}
.LoginMainPage form .input-box .details{
    display:block;
    font-weight:500;
    margin-bottom: 5px;
    font-size: 20px;
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
button {
    width: 100%;
    padding: 8px;
    margin-top:10px;
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
.DontHave{
    padding:2rem;
    text-align: center;
}
.DontHave span{
    margin:0.5rem;
}
.LoginSidePage{
    max-width:700px;
    width:100%;
    height:100vh;
}
</style>