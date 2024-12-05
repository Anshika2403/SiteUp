const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userSchema } = require("../schema");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );
};

module.exports.registerUser = async (req, res) => {

  const { error } = userSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({ message: "User registered successfully" }, user,token);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.loginUser = async (req, res) => {

  // const { error } = userSchema.validate(req.body);
  // if(error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password." });
      }

    const token = generateToken(user);
    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.logoutUser = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully." });
};
