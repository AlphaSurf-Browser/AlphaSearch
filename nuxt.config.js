export default {
  target: 'static', // Set to 'static' for generating a static site
  ssr: true, // Enable server-side rendering

  head: {
    title: 'AlphaSearch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  
  // Modules
  modules: [
    '@nuxtjs/axios', // Include axios for API calls
  ],
  
  // Axios configuration
  axios: {
    // Base URL for API requests
    baseURL: '/',
  },
  
  // Server middleware configuration
  serverMiddleware: [
    { path: '/api', handler: '~/server/api/crawler.js' }, // API route for your crawler
  ],
  
  // Build configuration
  build: {
    // Add any custom build configurations if necessary
  },
};
