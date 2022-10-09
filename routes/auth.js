const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router
  .post("/register", async (req, res) => {
    //  LETS VALIDATE USING JOI
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //  hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .post("/login", async (req, res) => {
    //  LETS VALIDATE USING JOI
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //  check if the email exists already
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");

    //    Password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is Wrong");

    // using jwt to assign token

    const accessToken = jwt.sign(
      { _id: user._id, username: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.header("Access_Token", accessToken).send(accessToken);
  });

module.exports = router;

/**
 * @openapi
 * /testimonials:
 *  get:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Obtiene todos los testimonios registrados en la organización
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *        type: integer
 *       description: Páginado. Cada página contine 10 registros de testimonios
 *     responses:
 *       200:
 *         description: Testimonios obtenidos satisfactoriamente
 *       404:
 *         description: No se encontró ningún registro
 *       500:
 *         description: Error en la respuesta del servidor
 */
