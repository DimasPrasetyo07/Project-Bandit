// const errorHandler = require("../middleware/handleError")
const { Category, Product, User, History } = require("../models");

class Controller {
  static async readAllProduct(req, res, next) {
    try {
      let data = await Product.findAll({
        include: [
          {
            model: User,
            as: "userId",
          },
          Category,
        ],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      let { name, description, price, stock, imgUrl, categoryId } = req.body;
      let data = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      let addNewProductHistory = await History.create({
        name: data.name,
        description: `New product with id ${data.id} created`,
        updatedBy: req.user.email,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
      // console.log(err)
      // if (err.name === 'SequelizeValidationError') {
      //     res.status(400).json({message: err.errors[0]})
      // } else {
      //     res.status(500).json({message: 'Internal Server Error'})
      // }
    }
  }
  static async editProduct(req, res, next) {
    let { name, description, price, stock, imgUrl, categoryId } = req.body;
    let productId = req.params.id;
    try {
      let singleProduct = await Product.findByPk(productId);
      if (!singleProduct) {
        throw { name: "Not_Found" };
      }
      let data = await Product.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          authorId: req.user.id,
        },
        {
          where: {
            id: singleProduct.id,
          },
            returning: true,
        }
      );
      if (!data) {
        throw { name: "Not_Found" };
      }
      let entityId = data[1][0].dataValues.id;
      let addNewEditProductHistory = await History.create({
        name: data[1][0].dataValues.name,
        description: `Entity with id ${entityId} updated`,
        updatedBy: req.user.email,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async changeStatus(req, res, next) {
    let {status} = req.body;
    let productId = req.params.id
    try {
      let entity = await Product.findByPk(productId);
      if (!entity) {
        throw { name: "Not_Found" };
      }
      let statusBeforeUpdated = entity.status;
      let data = await Product.update(
        {
          status,
        },
        {
          where: {
            id: entity.id,
          },
          returning: true,
        }
      );
      let entityId = data[1][0].dataValues.id;
      let entityName = data[1][0].dataValues.name;
      let statusAfterUpdated = data[1][0].dataValues.status;
      let addStatusHistory = await History.create({
        name: entityName,
        description: `Entity with id ${entityId} has been updated from ${statusBeforeUpdated} into ${statusAfterUpdated}`,
        updatedBy: req.user.email,
      });
      res
        .status(201)
        .json(
          `Entity with id ${entityId} has been updated from ${statusBeforeUpdated} into ${statusAfterUpdated}`
        );
    } catch (err) {
      next(err);
    }
  }

  static async findOneProduct(req, res, next) {
    try {
      let data = await Product.findByPk(req.params.id);
      if (!data) {
        throw { name: "Not_Found" };
      }
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async deleteOneProduct(req, res, next) {
    try {
      let entity = await Product.findByPk(req.params.id);
      if (!entity) {
        throw { name: "Not_Found" };
      }
      let data = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw { name: "Not_Found" };
      }
      let addNewDeleteProductHistory = await History.create({
        name: entity.name,
        description: `${entity.name} success to delete`,
        updatedBy: req.user.email,
      });
      res.status(200).json(`${entity.name} success to delete`);
    } catch (err) {
      next(err);
    }
  }

  static async readAllCategories(req, res, next) {
    try {
      let data = await Category.findAll({});

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async addCategories(req, res, next) {
    try {
      let { name } = req.body;
      let data = await Category.create({
        name,
      });
      let addNewCategoryHistory = await History.create({
        name: data.name,
        description: `New category with id ${data.id} created`,
        updatedBy: req.user.email,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async deleteOneCategory(req, res, next) {
    try {
      let entity = await Category.findByPk(req.params.id);
      console.log(entity, "<<<<<<<<<<<");
      if (!entity) {
        throw { name: "Not_Found" };
      }
      let data = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw { name: "Not_Found" };
      }
      let addNewDeleteCategoryHistory = await History.create({
        name: entity.name,
        description: `${entity.name} success to delete`,
        updatedBy: req.user.email,
      });
      res.status(200).json(`${entity.name} success to delete`);
    } catch (err) {
      next(err);
    }
  }
  static async readAllHistories(req, res, next) {
    try {
      let data = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
