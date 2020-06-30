const express = require("express");
const mongoose = require('mongoose');
const router = require('./routes/router');

(async () => {
  try {
    await mongoose.connect('mongodb+srv://igti:andre@bootcamp.cwoi3.mongodb.net/accounts?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  } catch (err) {
    console.error(err);
  }
})();

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("API is Running");
});
