// Backend (Express Application)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware configurations
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://maureenmiranda22:PqxEHalWziPVqy7n@cluster0.ive9g.mongodb.net/hack_04d?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'));

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


