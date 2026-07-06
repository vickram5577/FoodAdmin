const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRoute = require('./routes/users');
const categoriesRoute = require('./routes/categories');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const dashboardRoute = require('./routes/dashboard');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/dashboard', dashboardRoute);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
