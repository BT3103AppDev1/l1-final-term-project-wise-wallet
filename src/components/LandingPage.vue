<template>
    <div class="landingPageContainer">
        <h1>Budgeting Made Easy for Your Busy Life!</h1>
        <p>Life's full of surprises - groceries, date nights, unexpected road trip mishaps. WiseWallet has you covered, so you can handle it all with ease.</p>
        <button>Create Your Free Account</button>
    </div>
</template>

<style scoped>
.landingPageContainer {
    background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 20px;
}

p {
    padding:2rem;
    margin-right: 2rem;
    margin-left:2rem;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 30px;
}

button {
    padding: 10px 20px;
    font-size: 1.1rem;
    background-color: #FF7043;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #FF5722;
}
</style>