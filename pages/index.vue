<template>
  <div class="container">
    <h1 class="title">Welcome to AlphaSearch</h1>
    <p class="subtitle">Your personal search engine powered by AlphaBot.</p>
    <div class="search-container">
      <input
        v-model="url"
        type="text"
        placeholder="Enter URL to crawl"
        class="search-input"
      />
      <div class="button-container">
        <button @click="startCrawl" class="search-button">Start Crawl</button>
      </div>
    </div>
    <div v-if="message" class="message">{{ message }}</div>
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
    async startCrawl() {
      if (!this.url) {
        this.message = 'Please enter a URL.';
        return;
      }

      try {
        const response = await this.$axios.$post('/api/start-crawl', {
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
/* Keep your existing styles */
</style>
