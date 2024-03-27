require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const routers = require('./router')

app.use(cors())
app.use(express.json());

require('./bot/bot')

const dev = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT} PORT`);
    });
  } catch (error) {
    console.error(error);
  }
}

dev()