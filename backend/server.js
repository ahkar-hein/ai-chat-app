require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const testRoute = require('./routes/test');
const chatRoute = require('./routes/chat');

app.use('/api', authRoutes);   
app.use('/test', testRoute);
app.use('/chat', chatRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
