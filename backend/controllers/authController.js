const UserChat = require('../models/Userchat'); // Ensure this is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Function
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (userChat)
    const userChat = await UserChat.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Return the created user (without password)
    res.status(201).json({
      message: 'User created successfully',
      user: { username: userChat.username, email: userChat.email, role: userChat.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const userChat = await UserChat.findOne({ email });
    if (!userChat) return res.status(400).json({ error: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, userChat.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: userChat._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return the token and user details (without password)
    res.json({
      token,
      user: {
        username: userChat.username,
        email: userChat.email,
        role: userChat.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
