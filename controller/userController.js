const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schemaData = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(3).max(15).required(),
});
const registerReq = async (req, res) => {
  try {
    const dataReq = await schemaData.validateAsync(req.body);
    const { email, password } = dataReq;
    const saltRounds = 10;
    const saltPassword = await bcrypt.hash(password, saltRounds);
    const verifMail = await User.findOne({ email: email });
    if (verifMail === null) {
      const user = new User({
        email,
        password: saltPassword,
      });
      const a = await user.save();

      res.json(a);
    } else {
      throw { error: 409, ResponseBody: "Email in use" };
    }
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 409).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const loginReq = async (req, res) => {
  try {
    const dataReq = await schemaData.validateAsync(req.body);
    const { email, password } = dataReq;
    const dataUser = await User.findOne({ email: email });
    if (dataUser === null) {
      throw { error: 401, ResponseBody: "Email or password is wrong" };
    } else {
      const passwordData = await bcrypt.compareSync(
        password,
        dataUser.password
      );
      if (passwordData) {
        const token = jwt.sign(
          { email: dataUser.email, userId: dataUser._id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        await User.findByIdAndUpdate(dataUser._id, { token });
        res.status(200).json({
          token: `Bearer ${token}`,
          user: {
            email: dataUser.email,
            subscription: "free",
          },
        });
      } else {
        throw { error: 401, ResponseBody: "Email or password is wrong" };
      }
    }
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 401).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const logoutReq = async (req, res) => {
  try {
    const user = req.user;
    const resultId = await User.findById(user._id);
    if (resultId === null) {
      throw { error: 401, ResponseBody: "Not authorized" };
    } else {
      await User.findByIdAndUpdate(user._id, { token: "token" });
      res
        .status(204)
        .send({ Authorization: "Bearer token", message: "No Content" });
    }
  } catch (e) {
    res.status(e.error).send({ message: e.ResponseBody });
  }
};
const currentReq = async (req, res) => {
  try {
    const user = req.user;
    const resultId = await User.findById(user._id);
    if (resultId === null) {
      throw { error: 401, ResponseBody: "Not authorized" };
    } else {
      res
        .status(200)
        .send({ email: req.user.email, subscription: req.user.subscription });
    }
  } catch (e) {
    res.status(e.error).send({ message: e.ResponseBody });
  }
};
exports.logoutReq = logoutReq;
exports.loginReq = loginReq;
exports.registerReq = registerReq;
exports.currentReq = currentReq;
