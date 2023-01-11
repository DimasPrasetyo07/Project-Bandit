const { Op } = require("sequelize");
const { createHashPW, compareHashWithPW } = require("../helpers/bcrypt");
const { signPayLoad } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

const { User, Product, Wishlist, Category } = require("../models");

class ControllerCustomer {
  static async registerCustomer(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      if (!email) {
        throw { name: "Invalid_Email" };
      }
      if (!password) {
        throw { name: "Invalid_Password" };
      }
      let data = await User.create(
        {
          username,
          email,
          password: createHashPW(password),
          role: "Customer",
          phoneNumber,
          address,
        },
        {
          hooks: false,
        }
      );
      // console.log('sukses register')
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      // console.log(err, '<<<<< err dari controller')
      next(err);
    }
  }
  static async loginCustomer(req, res, next) {
    // res.status(200).json({msg:'tes'})
    // console.log('tes', '<<<<<<')
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
  static async getActiveProducts(req, res, next) {
    try {
      // tentuin dalam 1 halaman limitnya ada berapa produk
      let limit = 8;
      let option = {
        order: [["updatedAt", "DESC"]],
        where: {
          status: "Active",
        },
        limit,
      };
      // pastiin gimana caranya biar ketika kita lanjut ke page 2, produk yg sebelumnya gak ke fetch
      let page = req.query.page;
      if (page) {
        option.offset = (page - 1) * limit;
      } else {
        option.offset = 0;
      }
      //untuk search
      let search = req.query.search;
      if (search) {
        option.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }
      let data = await Product.findAndCountAll(option);
      let totalPage = Math.ceil(data.count / limit);
      console.log(data, "<<<<<<<<");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getWishList(req, res, next) {
    try {
        
      let userId = req.user.id;
      // console.log(userId, '<><><><><><>')
      
      let data = await Wishlist.findAll({
        where: {UserId : userId} ,
        include: [
          {
            model: Product,
            include: [
              {
                model: Category,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      })
      // console.log(data, '<><><><><><><>');
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getSingleProduct(req, res, next) {
    console.log(req.params.id, "<<<<<<<<");
    try {
      let productId = req.params.id;
      let data = await Product.findByPk(productId);
      if (!data) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async postWishList(req, res, next) {
    try {
      let userId = req.user.id;
      if (!userId) {
        throw { name: "Not_Login" };
      }
      let productId  = req.params.id;
      let product = await Product.findByPk(productId);
      if (!product) {
        throw { name: "Not_Found" };
      }
      let addedWishlist = await Wishlist.findOne({
        where: {
            UserId: userId, 
            ProductId: productId
        }
      })
      if (addedWishlist) {
        throw {name : 'Wishlist_Exist'}
      }
      let data = await Wishlist.create({
        UserId: userId,
        ProductId: productId,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async customerGoogleLogin(req, res, next) {
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
          role: "Customer",
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

module.exports = ControllerCustomer;
