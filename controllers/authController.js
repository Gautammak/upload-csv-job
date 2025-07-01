const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.Model.js');
const { validateRegisterInput, validateLoginInput } = require('../utils/validations.js');

exports.register = async (req, res) => {
  try {
    const errors = validateRegisterInput(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error: ' + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validateLoginInput(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Login Successfully", token });
  } catch (err) {
    res.status(500).json({ error: 'Server Error: ' + err.message });
  }
};
