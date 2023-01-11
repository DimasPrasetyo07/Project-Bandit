const express = require('express')
const Controller = require('../controllers/controller')
const {authorizationProduct, authorizationEditProductStatus} = require('../middleware/authorization')
const router = express.Router()

router.get('/', Controller.readAllProduct)
router.post('/', Controller.addProduct)
router.get('/:id',  Controller.findOneProduct)
router.put('/:id', Controller.editProduct)
router.patch('/:id', authorizationEditProductStatus, Controller.changeStatus)
router.delete('/:id', authorizationProduct, Controller.deleteOneProduct)



module.exports = router
