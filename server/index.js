require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const errorHandler = require('./middlewares/errorHandler');
const authroute = require('./routes/auth-route');
const gauthroute = require('./routes/gauth-route')
const userroute = require('./routes/user-route')
const listingroute = require('./routes/listing-route')
const tourroute = require('./routes/tour-route');
const reviewroute = require('./routes/review-route');
const reservationroute = require('./routes/reservation-route');
const transactionroute = require('./routes/transaction-route')


const app = express();
const PORT = 5000;

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

app.use('/api/auth', authroute);
app.use('/api/gauth', gauthroute);
app.use('/api/user',userroute);
app.use('/api/listing',listingroute);
app.use('/api/tour',tourroute);
app.use('/api/review',reviewroute);
app.use('/api/reservation',reservationroute);
app.use('/api/transaction',transactionroute);


app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
