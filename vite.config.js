const path = require("path");
// import { resolve } from 'path'

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  resolve: {
    alias: {
      "bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "bootstrap-icons": path.resolve(__dirname, "node_modules/bootstrap-icons"),
      "flatpickr": path.resolve(__dirname, "node_modules/flatpickr")
    },
  },
  server: {
    port: 8098,
    hot: true,
  },
};
