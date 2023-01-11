'use strict';

const { createHashPW } = require('../helpers/bcrypt');



module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/users.json')
    data.forEach(el => {
      el.password = createHashPW(el.password)
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
