const express = require('express')
const Controller = require('../controllers/controller')
const authentication = require('../middleware/authentication')
// const errorHandler = require('../middleware/handleError')
const router = express.Router()
const productsRoute = require('./products')
const usersRoute = require('./users')
const categoryRoute = require('./category')
const historyRoute = require('./history')
const pubRoute = require('./pub')


router.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

router.use('/users', usersRoute)
router.use('/pub', pubRoute)
router.use(authentication)
router.use('/products', productsRoute)
router.use('/categories', categoryRoute)
router.use('/histories', historyRoute)

// router.use(errorHandler)

module.exports = router