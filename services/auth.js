const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const sendEmail = require("../sendEmail");
const jwt = require("jsonwebtoken");
const Token = require("../model/Token");
const crypto = require("crypto");

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
    if (existingUser)
        throw new Error("This user already exist", { cause: 400 });

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
        throw new Error("You have entered an invalid username or password", {
            cause: 401,
        });
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

async function requestPasswordReset(req) {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) throw new Error("User doesn't exist");
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(10));
    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();
    const link = `${process.env.DOMAIN}/api/user/reset?token=${resetToken}&id=${user._id}`;
    sendEmail(
        user.email,
        "Password Reset Request",
        { name: user.name, link: link },
        "../template/requestResetPassword.handlebars"
    );
    return link;
}

async function resetPassword_serv(userId, token, password) {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
        throw new Error("Invalid or Expired Token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error("Invalid or expired Token");
    }
    const hash = await bcrypt.hash(password, Number(10));
    await User.updateOne(
        {
            _id: userId,
        },
        { $set: { password: hash } },
        { new: true }
    );
    const user = await User.findById({ _id: userId });
    sendEmail(
        user.email,
        "Password Updated successfully",
        { name: user.name },
        "../template/resetPassword.handlebars"
    );
    return true;
}

module.exports = {
    userRegister_serv,
    userLogin_serv,
    requestPasswordReset,
    resetPassword_serv,
};
