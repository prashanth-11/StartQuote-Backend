const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User, validate } = require("../models/user.js");

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User({ ...req.body, password: hashedPassword }).save();
    return res.status(200).send({ message: "Signup Successfull" });
  } catch (error) {
    console.log("dev sign up error", error);
    res.status(500).send({ message: "Error!! server not working" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const validate = (data) => {
      const schema = Joi.object({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().label("password").required(),
      });
      return schema.validate(data);
    };
    const { error } = validate(req.body);
    console.log(error);

    if (error) return res.status(400).send({ message: "validation error!!" });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(410).send({ message: "invalid email (or) password" });
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(410).send({ message: "invalid Password" });
    // if(!user)return res.status(410).send({message:"invalid email (or) password"})
    const token = user.generateAuthToken();
    res.status(200).send({ message: "Login successful!!" });
  } catch (error) {
    console.log("dev Login error:", error);
    return res.status(500).send({ message: "login server error!!" });
  }
});
module.exports = router;
