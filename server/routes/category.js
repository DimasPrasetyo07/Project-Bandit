const express = require('express')
const Controller = require('../controllers/controller')
const {authorizationCategory} = require('../middleware/authorization')

const router = express.Router()


router.post('/', Controller.addCategories)
router.get('/', Controller.readAllCategories)
router.delete('/:id', authorizationCategory, Controller.deleteOneCategory)

module.exports = router