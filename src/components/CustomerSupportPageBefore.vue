<template>
  <div class="customerSupportContainer">
    <div class="askQuestion">
      <div class="askTitle">
        <h1>Hi! How can we help?</h1>
        <p>Explore <span>WiseWallet</span> FAQ for all your queries</p>
        <div class="search-container">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search for articles..."
          />
          <button @click="searchArticles" type="submit">Search</button>
        </div>
      </div>
      <div class="faqArticles">
        <h1>FEATURED ARTICLES</h1>
        <div class="articlesContainer">
          <!-- <router-link to="/aboutWiseWallet_" class="router-link" style="text-decoration: none; color: inherit;">
                    <div class="articles">
                        <h2>About WiseWallet</h2>
                        <p>About WiseWallet</p>
                    </div>
                    </router-link>
                    <router-link to="/billingfaq_" class="router-link" style="text-decoration: none; color: inherit;">
                    <div class="articles">
                        <h2>How do I cancel my WiseWallet Subscription</h2>
                        <p>Billing & Subscription</p>
                    </div>
                    </router-link>
                    <router-link to="/productOfferings_" class="router-link" style="text-decoration: none; color: inherit;">
                    <div class="articles">
                        <h2>WiseWallet's product offerings</h2>
                        <p>Account Basics</p>
                    </div>
                        </router-link>
                    <div class="articles">
                        <h2>Contact WiseWallet Support</h2>
                        <p>Customer Support</p>
                    </div> -->
          <!-- Display filtered articles -->
          <div
            class="articles"
            v-for="article in filteredArticlesList"
            :key="article.title"
          >
            <router-link
              :to="article.routerLink"
              class="router-link"
              style="text-decoration: none; color: inherit"
            >
              <h2>{{ article.title }}</h2>
              <p>{{ article.category }}</p>
            </router-link>
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
          <i class="bx bxs-contact"></i>
          <h2>Chat support</h2>
          <p>Our support team is just a click away</p>
          <button class="chat-bot" @click="showChatBot">Chat Now</button>
        </div>
        <!-- <div class="contactWays">
                    <i class='bx bx-envelope'></i>
                    <h2>Email support</h2>
                    <p>Prefer to email? Send us an email and we'll get back to you soon</p>
                </div> -->
        <div class="contactWays">
          <i class="bx bx-help-circle"></i>
          <h2>Help center</h2>
          <p>
            Our self-serve help center is open 24/7 with 150+ articles to help
          </p>
        </div>

        <!-- email -->
        <div class="contactWays">
          <i class="bx bx-envelope"></i>
          <h2>Email support</h2>
          <p>
            Prefer to email? Send us an email and we'll get back to you soon
          </p>
          <!-- Add email contact functionality here -->
          <button class="email-btn" @click="openEmailClient">
            Contact via Email
          </button>
        </div>
      </div>
    </div>

    <div id="chatbot">
      <div id="chat-header">
        <h2>Chat</h2>
        <button @click="closeChatBot" id="closeButton" style="font-size: 20px">
          X
        </button>
      </div>
      <div id="chat-container" ref="chatContainer">
        <div class="message-container">
          <div v-for="message in chatMessages()" :key="message.content">
            <div v-if="message.role === 'assistant'" class="bot">
              {{ message.content }}
            </div>
            <div v-else-if="message.role === 'user'" class="user">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
      <form @submit="sendMessageToOpenAPI" id="sendMessage">
        <input id="messageInput" placeholder="Start Typing..." />
        <button class="send" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      articles: [
        {
          title: "About WiseWallet",
          category: "Account Basics",
          routerLink: "/",
        },
        {
          title: "How do I cancel my WiseWallet Subscription",
          category: "Billing & Subscription",
          routerLink: "/billingfaq",
        },
        {
          title: "WiseWallet's product offerings",
          category: "About WiseWallet",
          routerLink: "/productOfferings",
        },
        {
          title: "Contact WiseWallet Support",
          category: "About WiseWallet",
          routerLink: "/aboutWiseWallet",
        },
      ],
      filteredArticlesList: [
        {
          title: "About WiseWallet",
          category: "Account Basics",
          routerLink: "/",
        },
        {
          title: "How do I cancel my WiseWallet Subscription",
          category: "Billing & Subscription",
          routerLink: "/billingfaq",
        },
        {
          title: "WiseWallet's product offerings",
          category: "About WiseWallet",
          routerLink: "/productOfferings",
        },
        {
          title: "Contact WiseWallet Support",
          category: "About WiseWallet",
          routerLink: "/aboutWiseWallet",
        },
      ],
      messagesHistory: [
          {
            role: "system",
            content: "You are a customer support chatbot for WiseWallet.",
          },
          { role: "assistant", content: "Hi, how can I help you today?" },
        ],
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    chatMessages() {
      return this.messagesHistory;
    },
    scrollToBottom() {
      if (this.$refs.chatContainer) {
        this.$refs.chatContainer.scrollTop =
          this.$refs.chatContainer.scrollHeight;
      }
    },
    // Method to open user's default email client with pre-filled details
    openEmailClient() {
      const subject = "Customer Support Inquiry"; // Subject for the email
      const body = "Dear WiseWallet Support Team,\n\n"; // Body of the email

      window.location.href = `mailto:support@wisewallet.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    },
    searchArticles() {
      console.log("drsching...", this.searchTerm);
      const keywords = this.searchTerm.toLowerCase().match(/\b\w+\b/g); // Split search term into keywords
      console.log("keywords ", keywords);
      if (!keywords) {
        this.filteredArticlesList = this.articles;
        return;
      }
      let farticles = this.articles.filter((article) => {
        const titleMatch = keywords.some((keyword) =>
          article.title.toLowerCase().includes(keyword)
        ); // Check if any keyword matches the title
        const categoryMatch = keywords.some((keyword) =>
          article.category.toLowerCase().includes(keyword)
        ); // Check if any keyword matches the category
        return titleMatch || categoryMatch; // Return true if any keyword matches the title or category
      });
      console.log("fart ", farticles);
      this.filteredArticlesList = farticles;
      return;
    },
    showChatBot() {
      document.getElementById("chatbot").style.display = "flex";
    },
    closeChatBot() {
      document.getElementById("chatbot").style.display = "none";
    },
    async sendMessageToOpenAPI(event) {
      event.preventDefault();
      // Ensure the message input element exists and is of the correct type
      const messageInputElement = document.getElementById("messageInput");
      if (messageInputElement instanceof HTMLInputElement) {
        let message = messageInputElement.value;
        messageInputElement.value = ""; // Reset the input field after getting the value

        message = message !== undefined ? message.trim() : message;
        if (!message || message === "") {
          console.log("returning");
          return;
        }

        this.messagesHistory.push({ role: "user", content: message });
        const apiKey = process.env.OPENAI_API_KEY;
        const url = "https://api.openai.com/v1/chat/completions";

        const data = {
          model: "gpt-3.5-turbo",
          max_tokens: 1024,
          messages: this.messagesHistory,
          n: 1,
          stop: null,
          temperature: 0.7,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log("rsponse ", responseJson);
        const chatbotResponse =
          await responseJson.choices[0].message.content.trim();
        this.messagesHistory.push({
          role: "assistant",
          content: chatbotResponse,
        });
      }
    },
  },
};
</script>

<style scoped>
.user {
  color: black;
  padding: 10px;
  /* Add padding for content */
  border-radius: 5px;
  margin-left: max(30%);
  padding: 10px;
  text-align: end;
}

.bot {
  border: 1px solid rgb(200, 190, 190);
  background-color: rgb(244, 236, 236);
  color: black;
  border-radius: 13px 13px 13px 3px;
  padding: 10px;
  margin-right: max(20%);
  text-align: start;
}

#chatbot {
  background-color: white;
  color: black;
  display: none;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 400px;
  height: 600px;
  right: 0;
  bottom: 0;
  border: 1px solid black;
  margin-right: 1px;
  margin-bottom: 1px;
}

#chat-header {
  height: 10%;
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: start;
  width: 100%;
}

#chat-container {
  height: 70%;
  width: 100%;
  padding: 4px;
  overflow-y: auto;
}

#sendMessage {
  width: 100%;
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: end;
  margin-bottom: 3%;
}

#sendMessage input {
  height: 100%;
  padding-left: 5px;
  width: 75%;
}

#closeButton {
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  border: none;
  font-weight: bold;
}

.send {
  border: none;
  height: 100%;
  width: 20%;
  background-color: black;
  color: white;
}

.email-btn,
.chat-bot {
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.chat-bot:hover,
.email-btn:hover {
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  color: white;
}

.customerSupportContainer {
  position: relative;
  height: 100vh;
  flex: 1;
  background: white;
}

.supportTeam {
  height: 45%;
}

.getInTouch {
  background: white;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.getInTouch h1 {
  padding: 1.5rem;
}

.contactIcons {
  display: flex;
  justify-content: space-around; /* Spread items evenly */
  align-items: flex-start; /* Align items to the start to handle different content heights */
  flex-wrap: wrap; /* Wrap items if needed */
}

.contactWays {
  flex: 1; /* Each .contactWays takes equal space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: calc(
    33.333% - 20px
  ); /* Adjust based on your actual margins/paddings */
  box-sizing: border-box;
  margin: 10px; /* Spacing between the boxes */
  padding: 20px; /* Padding inside the boxes */
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  min-height: 200px; /* Minimum height to maintain the design */
}

.contactWays i {
  font-size: 50px;
}

.askQuestion {
  height: 55%;
}

.askTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  /* Set the height to 50% */
  background-size: cover;
  /* Adjust background size */
  background-position: center;
  /* Center the background image */
}

.askTitle h1 {
  padding: 1.5rem;
  color: black;
}

.askTitle p {
  padding: 1.5rem;
  font-size: 26px;
  color: black;
}

.askTitle span {
  font-weight: 700;
  position: relative;
  color: black;
}

.askTitle span::before {
  content: "";
  position: absolute;
  left: 10;
  bottom: 0;
  height: 3px;
  width: 30px;
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
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
  width: 400px;
  height: 60px;
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
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  color: white;
}

.askQuestion .faqArticles {
  background: #e5e5e1;
  height: 50%;
  text-align: center;
  padding: 2rem;
}

.askQuestion .faqArticles h1 {
  font-size: 20px;
  color: #4158d0;
}

.articlesContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.articles {
  padding: 2.5rem;
}
.articles:hover {
  color: #4158d0;
}
</style>
