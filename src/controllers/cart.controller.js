const  { CartDao } = require("../models/daos/app.daos");

const cartDao = new CartDao();

class CartsController {
    
    static getCarts = async (req, res) => {
        const carts = await cartDao.getAll();
    /*     if(!carts < 1){
          res.status(404).send(error)
        } */
          res.status(200).send({status: "OK", data: carts})
    }

    static createCart = async (req,res) => {
      const newCart = await cartDao.save({products: []})
      res.status(200).send({status: "OK", data: newCart})
    }


    static getOneCart = async (req, res) => {
      const { idCart } = req.params;
      const cart = await cartDao.getById(idCart);

      res.status(200).send({status: "OK", data: cart}) 

    }

    static getProductsCart = async (req, res) => {
      const { idCart } = req.params;
      const cartProd = await cartDao.getCartProds(idCart)
      

     /*  if(!cart){
        res.status(404).send(error.message)
      } */
      res.status(200).send({status: "OK", data: cartProd}) 
    }


    static deleteOneCart = async (req, res) => {
        const { params: {idCart}} = req;
        if (!idCart) {
            return {error: `No se escribio un id ${id} existente`}
        }
    
        const deletedCart = cartDao.delete(idCart);
        res.status(200).send({status: "OK", data: deletedCart})
    }

    static saveOneProductCart = async (req, res) => {
        const {idCart, idProd} = req.params;

        const products = await cartDao.addProduct(idCart, idProd);
         
        res.status(200).send({status: "OK", data: products})
    }


    static deleteOneProductCart =  async (req, res) => {
        const { idCart, idProd } = req.params;

       const deleteOneProduct = cartDao.deleteProduct(idCart, idProd);
       res.status(202).send({ status: "Delete", data: deleteOneProduct });
    }

    
}


module.exports = CartsController