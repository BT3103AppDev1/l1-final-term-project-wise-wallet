<template>
    <div class="ProfilePage-container">
        <h1>Profile</h1>
            <p>Edit and manage your personal and account information here</p>
            <div class="profileOptions">
                <router-link to="/myProfile" class="router-link" style="text-decoration: none; color: inherit;">
                <div class="personalInformation">
                    <h2>Personal Information</h2>
                </div>
                </router-link>
                <router-link to="/changePassword" class="router-link" style="text-decoration: none; color: inherit;">
                <div class="passwordReset">
                    <h2>Change Password</h2>
                </div>
                </router-link>
                <div class="verificationCenter">
                    <h2>Verification Center</h2>
                </div>
            </div>
            <div class="profileDetails">
                <div class="profilePic">
                    <div class="picBox">
                        <i class='bx bx-user' ></i>
                    </div>
                    <div class="input-box1">
                        <label for="profile-picture-upload">Upload Profile Picture</label>
                        <input type="file" id="profile-picture-upload" accept="image/*">
                    </div>
                    <div class="emailIcon">
                        <i class='bx bxs-envelope' ></i>
                        <h4>{{ userEmail }}</h4>
                    </div>
                </div>
                <div class="personalProfile">

                    <div class="profileIcon">
                        <i class='bx bxs-user-detail' ></i>
                        <h3>Change Password</h3>
                    </div>
                    <form @submit.prevent="changePassword">
                        <div class="user-details">
                            <div class="input-box">
                                <label class="details">Current Password:</label>
                                <input type="text" v-model="currentPassword" required>
                            </div>
                            <div class="input-box">
                                <label class="details">New Password:</label>
                                <input type="text" v-model="newPassword" required>
                            </div>
                            <div class="input-box">
                                <label class="details">Confirm Password:</label>
                                <input type="text" v-model="confirmPassword" required>
                            </div>
                        </div>
                        <div class="saveButton">
                        <button type ="submit">Save</button>
                    </div>
                    </form>
                </div>
            </div>
    </div>
</template>
<script>
import { auth, db } from '@/assets/firebase.js';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
export default {
  data() {
    return {
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
        userEmail:''
    };
  },
  mounted() {
    // Subscribe to changes in authentication state
    auth.onAuthStateChanged(user => {
      if (user) {
        // If user is signed in, set userEmail property
        this.userEmail = user.email;
      } else {
        // If user is signed out, clear userEmail property
        this.userEmail = '';
      }
    });
  },
  methods: {
    async changePassword() {
      // Check if new password matches the confirm password
      if (this.newPassword !== this.confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }

      // Get the current user
      const user = auth.currentUser;

      // Create a credential with the user's email and current password
      const credential = EmailAuthProvider.credential(user.email, this.currentPassword);

      try {
        // Reauthenticate the user with the provided credential
        await reauthenticateWithCredential(user, credential);

        // Update the user's password
        await updatePassword(user, this.newPassword);

        // Password updated successfully
        alert('Password updated successfully');
        
        // Clear the input fields
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } catch (error) {
        // Handle any errors
        console.error('Error updating password:', error);
        alert('Failed to update password');
      }
    }
  }
};
</script>
<style scoped>
.ProfilePage-container{
    height:100vh;
    background: white;
    flex:1;
    margin-left:300px;
    margin-top:90px;
    position:relative;
}
.ProfilePage-container h1{
    padding:1rem;
    text-align: center;
}
.ProfilePage-container p{
    text-align: center;
    padding-bottom:1rem;
}
.profileOptions{
    background: #f5f5f5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.profileOptions{
    font-size:13px;
    padding-left: 1rem;
}
.profileOptions h2{
    font-weight: normal;
}
.personalInformation{
    padding:1rem;
    margin:1.5rem;
    border-radius:20px;
}
.personalInformation:hover{
    background:linear-gradient(65deg, deeppink,coral);
    color:white
}
.passwordReset{
    padding:1rem;
    margin:1.5rem;
    border-radius:20px;
}
.passwordReset:hover{
    background:linear-gradient(65deg, deeppink,coral);
    color:white
}
.verificationCenter{
    padding:1rem;
    margin:1.5rem;
    border-radius:20px;
}
.verificationCenter:hover{
    background:linear-gradient(65deg, deeppink,coral);
    color:white
}
.profileDetails{
    padding:1rem;
    display:flex;
    justify-content: flex-start;
    max-height:100%;
    padding-top:7rem;
}
.profilePic{
    padding-top:5rem;
}
.picBox {
    display: flex; /* Use flexbox */
    justify-content: center; /* Align items horizontally in the center */
    align-items: center; /* Align items vertically in the center */
    border-radius: 20px;
    font-size: 100px;
    min-height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    text-align: center;
}
.input-box1{
    padding:1rem;
    font-size: 20px;
}
.emailIcon{
    display:flex;
    align-items: center;
    justify-content: center;
    padding:1rem;
    text-align: center;
}
.emailIcon i{
    color:blue;
    margin-right:0.3rem;
}
.personalProfile{
    padding:1rem;
    width:100%;
    padding-left:1.5rem;
}
.profileIcon{
    display:flex;
    align-items: center;
}
.profileIcon i{
    font-size:42px;
    color: blue;
}
.profileIcon h3{
    font-size:27px;
}
.user-details{
    display:flex;
    flex-wrap: wrap;
    font-size: 21px;
    font-weight: 500;
    justify-content: space-between;
    margin:20px 0 12px 0;
}
.profileDetails .input-box{
    margin-bottom:18px;
    width:calc(100% / 2 - 20px);
}
.profileDetails form .input-box .details{
    display:block;
    font-weight:500;
    margin-bottom: 5px;
}
.profileDetails .input-box input,
.profileDetails .input-box select {
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
.profileDetails .user-details .input-box input:focus,
.profileDetails .user-details .input-box input:valid{
border-color: #9b59b6;
}
.saveButton{
    display: flex;
    justify-content: flex-end;
}
.saveButton button{
    width: 100px;
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
  
  .saveButton button:hover {
    background:linear-gradient(-135deg, #71b7e6, #9b59b6)
  }
</style>