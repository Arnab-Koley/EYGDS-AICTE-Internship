require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://deshdekho.vercel.app"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the deshdekho server');
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
