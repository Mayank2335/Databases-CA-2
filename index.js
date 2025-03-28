const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
