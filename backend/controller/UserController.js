const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require(`bcrypt`);

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await User.login(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }

    // create a token
    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// signup a user
const signUpHandler = async (req, res) => {
  // console.log(email);
  // console.log(password);
  // console.log(name);
  // console.log(phone);
  try {
    const { email, password, name, phone } = req.body;
    // checking whether the user Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User exists please try login",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // const user = await User.signup(email, password, name, phone);
    const user = await User.create({
      email,
      phone,
      name,
      password:hash
    });

    const savedUser = await user.save();
    if (savedUser) {
      return res.status(200).json({
        status: true,
        message: "User created successfully",
      });
    }

    // create a token
    const token = createToken(savedUser._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpHandler, loginHandler };
