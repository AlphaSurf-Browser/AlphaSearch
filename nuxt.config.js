export default {
  target: 'static', // Set to 'static' for generating a static site
  ssr: false, // Set to false if you only want static generation

  head: {
    title: 'AlphaSearch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  
  // Server middleware configuration
  serverMiddleware: [
    { path: '/api', handler: '~/server/api/crawler.js' }, // API route for your crawler
  ],
  
  // Build configuration
  build: {
    // Add any custom build configurations if necessary
  },

  // Generate configuration
  generate: {
    dir: 'dist', // Specify the output directory for static files
  },
};
