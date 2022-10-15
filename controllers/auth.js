const { userRegister_serv, userLogin_serv } = require("../services/auth");
const { errorHandler } = require("./error_handler");

async function userRegister_ctrl(req, res, next) {
  try {
    const newUser = await userRegister_serv(req);
    return res.status(200).send({ ...newUser._doc, password: undefined });
  } catch (error) {
    errorHandler(res, error);
  }
}

async function userLogin_ctrl(req, res, next) {
  try {
    const accessToken = await userLogin_serv(req);
    return res.status(200).header("Access_Token", accessToken).send({ accessToken });
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  userRegister_ctrl,
  userLogin_ctrl,
};
