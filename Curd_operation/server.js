const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const crudRoutes = require('./routes/crudRoutes');

const app = express();

// Connect to Database
connectDB();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', crudRoutes);

// Server Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
