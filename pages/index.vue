<template>
  <div class="container">
    <h1 class="title">Welcome to AlphaSearch</h1>
    <p class="subtitle">Your personal search engine powered by AlphaBot.</p>

    <!-- Search input and button -->
    <div class="search-container">
      <input
        v-model="url"
        type="text"
        placeholder="Enter URL to search"
        class="search-input"
      />
      <button @click="startSearch" class="search-button">Search</button>
    </div>

    <!-- Search Results -->
    <div v-if="results.length" class="results">
      <h2>Search Results:</h2>
      <pre>{{ results }}</pre>
    </div>

    <!-- Search error message -->
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      results: [],
      message: '',
    };
  },
  methods: {
    async startSearch() {
      this.message = '';
      this.results = [];

      if (!this.url) {
        this.message = 'Please enter a URL.';
        return;
      }

      try {
        const response = await fetch('/api/start-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: this.url }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.results = data.results; // Adjust according to your API response structure
      } catch (error) {
        this.message = `Search error: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #580c9f; /* Purple background */
    color: white;
    line-height: 1.6;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
}

.title {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    padding: 12px;
    width: 300px;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border: 2px solid #fff;
    background-color: #4a0072; /* Darker shade of purple */
}

.search-button {
    background-color: #007bff; /* Blue button */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
}

.search-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: translateY(-2px);
}

.results {
    margin-top: 20px;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    overflow-x: auto; /* Enable horizontal scrolling if necessary */
}

.message {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #ff4500; /* Error message color */
    border: 1px solid #ff4500;
    padding: 10px;
    border-radius: 4px;
    background-color: rgba(255, 69, 0, 0.1); /* Light red background */
}

h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: left;
}

pre {
    white-space: pre-wrap; /* Enable wrapping */
    word-wrap: break-word; /* Enable breaking long words */
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.05); /* Light background for code */
    border-radius: 4px;
    overflow: auto; /* Add scrollbars if necessary */
}

/* Responsive Styles */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }

    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1.2rem;
    }

    .search-input {
        width: 100%;
    }

    .search-container {
        flex-direction: column;
    }

    .search-button {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
