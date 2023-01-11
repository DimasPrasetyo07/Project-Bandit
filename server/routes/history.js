const express = require('express')
const Controller = require('../controllers/controller')
const {authorizationCategory} = require('../middleware/authorization')

const router = express.Router()


router.get('/', Controller.readAllHistories)


module.exports = router