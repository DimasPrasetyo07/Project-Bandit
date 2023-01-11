const { json } = require("sequelize");
const { compareHashWithPW } = require("../helpers/bcrypt");
const { signPayLoad, verifyToken } = require("../helpers/jwt");
const { Category, Product, User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

class ControllerUser {
  static async readAllUsers(req, res, next) {
    try {
      let data = await User.findAll();
      if (!data) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
      // if (err === 'Not Found') {
      //     res.status(404).json({ message: err })
      // } else {
      //     res.status(500).json({ message: 'Internal Server Error' })
      // }
    }
  }
  static async createNewUser(req, res, next) {
    // console.log(req.body, '<<<<<<')
    try {
      let { username, email, password, role, phoneNumber, address } = req.body;
      let data = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      next(err);
      // console.log(err, '====================================')
      // if (err.name == 'SequelizeValidationError') {
      //     // console.log(err.errors[0], '====================================')
      //     res.status(400).json({message: err.errors[0]})
      // } else {
      //     res.status(500).json({message: 'Internal Server Error'})
      // }
    }
  }
  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      let data = await User.findOne({
        where: { email },
      });
      if (!data) {
        throw { name: "Email/Password_Incorrect" };
      }
      let comparePW = compareHashWithPW(password, data.password);
      if (!comparePW) {
        throw { name: "Email/Password_Incorrect" };
      }
      let access_token = signPayLoad({
        id: data.id,
        username: data.username,
        email: data.email,
      });
      let id = data.id;
      let username = data.username;
      let role = data.role;
      res.status(200).json({ access_token, id, role, username });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      // console.log(google_token, "<<<<<<<");

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: clientId, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      // console.log(ticket, '===== ini tiket')
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          username: payload.given_name,
          password: "123456",
          role: "Staff",
        },
        hooks: false,
      });
      const access_token = signPayLoad({ id: user.id });
      const role = user.role;
      const username = user.username;
      const id = user.id;

      res.status(200).json({ access_token, id, role, username });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  }
}

module.exports = ControllerUser;
