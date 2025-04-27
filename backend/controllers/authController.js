const UserChat = require('../models/Userchat'); // Ensure this is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userChat = await UserChat.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { username: userChat.username, email: userChat.email, role: userChat.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userChat = await UserChat.findOne({ email });
    if (!userChat) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, userChat.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: userChat._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

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
