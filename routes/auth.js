const {
    userRegister_ctrl,
    userLogin_ctrl,
    requestResetPassword_ctrl,
    resetPassword_ctrl,
} = require("../controllers/auth");
const router = require("express").Router();

router.post("/register", userRegister_ctrl);
router.post("/login", userLogin_ctrl);
router.post("/forgot_password", requestResetPassword_ctrl);
router.post("/reset", resetPassword_ctrl);

module.exports = router;
