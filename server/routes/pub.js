const ControllerCustomer = require("../controllers/controllerCustomer");
const express = require('express')
const router = express.Router();
const authentication = require('../middleware/authentication');
const { authorizationWishlist } = require("../middleware/authorization");


router.post('/customers', ControllerCustomer.registerCustomer)
router.post('/login', ControllerCustomer.loginCustomer)
router.post('/google-login', ControllerCustomer.customerGoogleLogin)
router.get('/products', ControllerCustomer.getActiveProducts)
router.get('/products/:id', ControllerCustomer.getSingleProduct)
router.use(authentication)
router.get('/wishlist', authorizationWishlist, ControllerCustomer.getWishList)
router.post('/wishlist/:id', authorizationWishlist, ControllerCustomer.postWishList)

module.exports = router;