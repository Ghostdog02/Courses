const express = require("express");

const app = express();

app.use((request, response, next) => {
  console.log("First middleware");
  next();
});

app.use((request, response, next) => {
  response.send("Hello from express");
});

module.exports = app;
