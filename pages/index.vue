<template>
  <div class="container">
    <h1 class="title">Welcome to AlphaSearch</h1>
    <p class="subtitle">Your personal search engine powered by AlphaBot.</p>
    
    <!-- Search input and button in the middle -->
    <div class="search-container">
      <input
        v-model="url"
        type="text"
        placeholder="Enter URL to search"
        class="search-input"
      />
      <div class="button-container">
        <button @click="startSearch" class="search-button">Search</button>
      </div>
    </div>

    <!-- Search Results below search input -->
    <div v-if="message" class="message">{{ message }}</div>

    <!-- Search button in the bottom right corner -->
    <div class="search-container-bottom">
      <button @click="startSearch" class="search-button-bottom">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      message: '',
    };
  },
  methods: {
    async startSearch() {
      if (!this.url) {
        this.message = 'Please enter a URL.';
        return;
      }

      try {
        const response = await this.$axios.$post('/api/start-search', {
          url: this.url,
        });
        this.message = response.message;
      } catch (error) {
        this.message = error.response.data.error || 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  padding: 10px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.search-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 20px;
  font-size: 1.2rem;
}

.search-container-bottom {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.search-button-bottom {
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-button-bottom:hover {
  background-color: #218838;
}
</style>
