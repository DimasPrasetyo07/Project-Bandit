'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/products.json')
    data.map(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert ('Products', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
