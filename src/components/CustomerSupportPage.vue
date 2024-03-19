<template>
    <div class="customerSupportContainer">
        <div class="askQuestion">
            <div class="askTitle">
                <h1>Hi! How can we help?</h1>
                <p>Explore <span>WiseWallet</span> FAQ for all your queries</p>
                <div class="search-container">
                    <input type="text" placeholder="Search for articles...">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </div>
            </div>
            <div class="faqArticles">
                <h1>FEATURED ARTICLES</h1>
                <div class="articlesContainer">
                    <div class="articles">
                        <h2>About WiseWallet</h2>
                        <p>Account Basics</p>
                    </div>
                    <div class="articles">
                        <h2>How do I cancel my WiseWallet Subscription</h2>
                        <p>Billing & Subscription</p>
                    </div>
                    <div class="articles">
                        <h2>WiseWallet's product offerings</h2>
                        <p>About WiseWallet</p>
                    </div>
                    <div class="articles">
                        <h2>Contact WiseWallet Support</h2>
                        <p>About WiseWallet</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="supportTeam">
            <div class="getInTouch">
                <h1>Get in touch</h1>
                <p>We're happy to hear from you. What's on your mind?</p>
            </div>
            <div class="contactIcons">
                <div class="contactWays">
                    <i class='bx bxs-contact' ></i>
                    <h2>Chat support</h2>
                    <p>Our support team is just a click away</p>
                </div>
                <div class="contactWays">
                    <i class='bx bx-envelope' ></i>
                    <h2>Email support</h2>
                    <p>Prefer to email? Send us an email and we'll get back to you soon</p>
                </div>
                <div class="contactWays">
                    <i class='bx bx-help-circle' ></i>
                    <h2>Help center</h2>
                    <p>Our self-serve help center is open 24/7 with 150+ articles to help</p>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.customerSupportContainer{
    height:100vh;
    flex:1;
    background: white;
}
.supportTeam{
    height:45%;
}
.getInTouch{
    background:white;
    height:40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.getInTouch h1{
    padding:1.5rem;
}
.contactIcons {
    display: flex;
    justify-content: space-between; /* Spread items evenly */
    align-items: center;
    padding: 1rem;
}
.contactWays {
    background:#f5f5f5;
    width: 550px; /* Set a fixed width */
    height: 200px; /* Set a fixed height */
    padding: 20px;
    border-radius: 20px;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    text-align: center;
    margin: 0 10px; /* Add margin between boxes */
    box-sizing: border-box; /* Include padding and border in the width */
}
.contactWays i{
    font-size: 50px;
}
.askQuestion{
    height:55%;
}
.askTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%; /* Set the height to 50% */
  background-image: url('src/assets/iStock-1159238834-1628x1080.jpeg');
  background-size: cover; /* Adjust background size */
  background-position: center; /* Center the background image */
}
.askTitle h1 {
  padding:1.5rem; 
  color:white;
}
.askTitle p{
    padding:1.5rem;
    font-size:26px;
    color:white;
}
.askTitle span{
    font-weight:700;
    position:relative;
    color:white
}
.askTitle span::before{
    content:"";
    position:absolute;
    left:10;
    bottom:0;
    height:3px;
    width:30px;
    background:linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
.search-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
}
.search-container input[type="text"] {
    flex: 1;
    width:400px;
    height:60px;
    border: none;
    padding: 8px;
    border-radius: 5px;
    outline: none;
}
.search-container button {
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
}
.search-container button:hover {
    background-color: #0056b3;
}
.askQuestion .faqArticles{
    background:#e5e5e1;
    height:50%;
    text-align: center;
    padding:2rem;
}
.askQuestion .faqArticles h1{
    font-size:20px;
    color:#4158D0;
}
.articlesContainer{
    display:flex;
    justify-content: center;
    align-items: center;
    padding:2rem;
}
.articles{
    padding:2.5rem;
}
</style>