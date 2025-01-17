const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userSchema } = require("../schema");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "4hr" }
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
    res.cookie('authToken', token, { httpOnly: true, secure: true, maxAge: 3600000 });
    res.status(201).json({ message: "User registered successfully" , user, token });
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

// module.exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     console.log(userId)
//     const updates = req.body;

//     const user = await User.findByIdAndUpdate(userId, updates, {
//       new: true, // Return the updated user object
//       runValidators: true, // Ensure validation rules are applied
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
