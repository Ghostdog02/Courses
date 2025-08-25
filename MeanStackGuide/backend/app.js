import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';

import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express();

mongoose
  .connect(
    "mongodb+srv://alexvesely07:KHUCz3sp8H9prW1r@cluster0.2p1abc9.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static('./images'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes)

export default app;