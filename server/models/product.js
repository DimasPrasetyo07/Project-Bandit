'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: 'authorId', as: 'userId'}),
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Product.belongsToMany(models.User, {through: models.Wishlist, foreignKey: 'ProductId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'product name is required'
        },
        notNull: {
          msg: 'product name is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description is required'
        },
        notNull: {
          msg: 'description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'product price is required'
        },
        notNull: {
          msg: 'product price is required'
        },
        min: {
          args: 1000,
          msg: 'minimum price for a product is 1000'
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Active'
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};