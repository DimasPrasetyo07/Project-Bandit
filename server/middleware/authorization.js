const { Product, Category, Wishlist } = require("../models");

async function authorizationProduct(req, res, next) {
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { name: "Not Found" };
    }
    if (product.authorId == req.user.id || req.user.role == "Admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationEditProductStatus(req, res, next) {
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { name: "Not_Found" };
    }
    if (req.user.role == "Admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationCategory(req, res, next) {
  try {
    let category = await Category.findByPk(req.params.id);
    if (!category) {
      throw { name: "Not_Found" };
    }
    next();
    // if (category.id == req.user.id || req.user.role == 'Admin') {
    //     next()
    // } else {
    //     throw { name: 'Forbidden' }
    // }
  } catch (err) {
    next(err);
  }
}
async function authorizationWishlist(req, res, next) {
  try {
    let userId = req.user.id;
    let data = await Wishlist.findAll({
      where: userId,
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
    });
    if (req.user.role == 'Customer') {
        next()
    } else {
        throw { name: 'Forbidden' }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authorizationProduct,
  authorizationCategory,
  authorizationEditProductStatus,
  authorizationWishlist
};
