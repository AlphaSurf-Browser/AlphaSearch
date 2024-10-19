<template>
  <div>
    <h1>Start AlphaBot Crawler</h1>
    <input v-model="url" placeholder="Enter URL to crawl" />
    <button @click="startCrawl">Start Crawl</button>
    <div v-if="message">{{ message }}</div>
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
      try {
        const response = await this.$axios.post('/api/start-crawl', { url: this.url });
        this.message = response.data.message; // Ensure to access the correct response structure
      } catch (error) {
        this.message = error.response?.data?.error || 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles you want here */
</style>
