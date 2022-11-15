const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");
const ProductsMongoDao = require('../products/products.mongo.dao');


const productsMongoDao = new ProductsMongoDao

const collection = 'carts';
const cartsSchema = new Schema(
  {
    timestamp: { type: Date, default: new Date().toLocaleString() },
    products: { type: Array, required: true, default: [] }
  },

);

class CartsMongoDao extends MongoContainer {
    constructor(){
        super(collection, cartsSchema)
    }

    async getCartProds (cartId){
        const cart = await this.getById(cartId);
        return [...cart.products]
    }

    async addProduct(idCart, idProduct) {
      const product = await productsMongoDao.getById(idProduct);
      const addProductCart = await this.model.updateOne(
        { _id: idCart },
        { $push: { products: idProduct } }
      )
      if (!addProductCart.matchedCount) {
        const message = `Cart with id ${idCart} does not exist`;
        console.log(message)
      }
      return product;
    }
  
    async deleteProduct(idCart, idProd) {
      await productsMongoDao.getById(idProd);
      const deleteProduct = await this.model.updateOne(
        { _id: idCart }, 
        {$pull: { products: idProd }}
      )
      if (!deleteProduct.matchedCount) {
        const message = `Cart with id ${cartId} does not exist.`;
        console.log(message)
      }
      return deleteProduct;
    }


    
}


module.exports = CartsMongoDao;