const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "y3yq8g",
  viewportWidth: 1400,
  viewportHeight: 800,

  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "webpack",
    },
  },
});
