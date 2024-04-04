
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const itemRoutes = require('./routes/itemRoutes');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Middleware
app.use(bodyParser.json());
app.use(cors())
app.use('/api/uploads', express.static('uploads')); // Serve uploaded files statically

// Routes
app.use('/api/items', itemRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
