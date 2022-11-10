//IMPORTACIONES
const express = require ('express');
const router = express.Router();
const cartController = require ('../../controllers/cart.controller')

//ROUTES

router.post('/', cartController.createCart);
router.delete('/:idCart', cartController.deleteOneCart);
router.get('/:idCart/products', cartController.getOneCart);
router.post('/:idCart/products', cartController.saveOneProductCart);
router.delete('/:idCart/products/:id_Prod', cartController.deleteOneProductCart);

  
module.exports = router;