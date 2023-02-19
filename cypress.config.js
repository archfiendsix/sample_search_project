const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'txtefo',
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  requestTimeout: 30000,
  // numTestsKeptInMemory: 0,
  // numTestsKeptInMemory: 0,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  video: true,
  experimentalSingleTabRunMode: true,
  watchForFileChanges: true,
  includeShadowDom: true
  // retries: {
  //   runMode: 1,
  //   openMode: 1,
  // },
  // experimentalStudio: true
});
