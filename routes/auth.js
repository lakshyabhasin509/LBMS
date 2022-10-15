const { userRegister_ctrl, userLogin_ctrl } = require("../controllers/auth");
const router = require("express").Router();

router.post("/register", userRegister_ctrl);
router.post("/login", userLogin_ctrl);

module.exports = router;
