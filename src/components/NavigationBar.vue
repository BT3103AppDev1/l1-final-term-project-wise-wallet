<template>
    <div class="navbar">
        <router-link to ='/' class="logo">WiseWallet</router-link>
        <input type="checkbox" id="check">
        <label for ="check" class="icons">
            <button class="getStarted_btn" id="getStarted" @click="navigateToSignUp">Get started</button>
            <i class="bx bx-menu" id="menuOpen"></i>
            <i class = "bx bx-x" id="menuClose"></i>
        </label>
        <nav class="navItems">
            <router-link to ='/productOfferings_' class="router-link">How it works</router-link>
            <router-link to ='/customer-support-before' class="router-link">FAQ</router-link>
            <a href="#">Testimonials</a>
            <router-link to ='/aboutWiseWallet_' class="router-link">About Us</router-link>
            <router-link to ='/login' class="router-link">Login</router-link>
            <a class="getStarted_btn" id="getStarted" @click="navigateToSignUp" >Get started</a>
        </nav>
    </div>
</template>
<script>
export default {
  methods: {
    navigateToSignUp() {
      // Programmatically navigate to the desired route
      this.$router.push('/registration');
    }
  }
}
</script>
<style>
.navbar{
    width: 100%;
    top:0; left:0;
    padding:1.3rem 10%;
    position: sticky;
    display:flex;
    justify-content: space-between;
    align-items: center;
    z-index:100;
    background: black;
}

.navbar .logo{
    font-size:2rem;
    color:#fff;
    text-decoration: none;
    font-weight: 700;
    position:relative
}
.navbar .logo::after {
    content: '';
    position: absolute;
    left:0;
    bottom:0;
    height: 3px;
    width: 30px; /* Extend the line across the width of the parent */
    background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.navItems a{
    font-size:1.15rem;
    color:#fff;
    text-decoration:none;
    font-weight:500;
    margin-left:2.5rem
}

.navItems a:hover{
    color:aquamarine;
}

.navItems{
    display:inline-block
}

.navItems a.getStarted_btn:hover{
    color:black;
}

.getStarted_btn{
    color: white;
    cursor:pointer;
    padding:0.5rem 1.5rem;
    background:linear-gradient(65deg, deeppink,coral);
    border-radius: 5rem;
    transition:0.2s linear;
}

.navbar .getStarted_btn:hover{
    color:black;
}

#getStarted{
    margin-right: 2rem;
}

.getStarted_btn:hover{
    background: white;
}

.icons{
    font-size:2.8rem;
    color:#fff;
    cursor:pointer;
    display:none;
}
.icons #menuClose{
    display: none;
}
#check{
    display:none;
}


@media(max-width:1300px){
    .navbar{
        padding:1.3rem 5%
    }
}

@media(max-width:1152px){

  .icons{
        display:inline-flex;
    }

    .icons #menuClose{
        display:none;
    }

    #check:checked ~ .icons #menuOpen{
        display:none;
    }
    #check:checked ~ .icons #menuClose{
        display:inline-flex;
    }

    .navItems {
        position:absolute;
        top:100%;
        left:0;
        width:100%;
        height:0;
        background: rgba(0,0,0,.1);
        backdrop-filter: blur(50px);
        box-shadow:0.5rem 1rem rgba(0,0,0,.1);
        overflow: hidden;
        transition: 0.3s ease;
    }
    #check:checked ~.navItems{
        height:18rem;
    }
    .navItems a{
        display:block;
        font-size:1.1rem;
        margin:1.5rem 0;
        text-align:center;
        transform: translateY(-50px);
        transition:.3s ease;
    }
    .navItems .getStarted_btn{
        display: none;
    }
    #check:checked ~.navItems a{
        transform: translateY(0);
    }
}
</style>