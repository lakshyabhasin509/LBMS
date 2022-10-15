const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userRegister_serv(req) {
  //  Let's validate using JOI
  const { error } = registerValidation(req.body);
  if (error) {
    throw new Error(error.details[0].message, { cause: 400 });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  let existingUser = await User.findOne({ name: user.name });
  if (existingUser) throw new Error("Username already taken", { cause: 400 });
  existingUser = await User.findOne({ email: user.email });
  if (existingUser) throw new Error("This user already exist", { cause: 400 });

  const savedUser = await user.save();
  return savedUser;
}

async function userLogin_serv(req) {
  //  Let's validate using JOI

  const { error } = loginValidation(req.body);
  if (error) {
    throw new Error(error.details[0].message, { cause: 400 });
  }

  //  Check if the email exists already & password correct
  const user = await User.findOne({ email: req.body.email });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!user || !validPass)
    throw new Error("You have entered an invalid username or password", { cause: 401 });

  // using jwt to assign token

  const accessToken = jwt.sign(
    { _id: user._id, username: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return accessToken;
}

module.exports = {
  userRegister_serv,
  userLogin_serv,
};
