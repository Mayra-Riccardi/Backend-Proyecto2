const FirebaseContainer = require('../../containers/firebase.container');
const { FieldValue  } = require('firebase-admin/firestore');

const ProductsFirebaseDao = require('../products/products.firebase.dao');
const { HttpError } = require('../../../utils/api.utils');
const  HTTP_STATUS  = require('../../../constants/api.constants');



const productsFirebaseDao = new ProductsFirebaseDao();

const collection = 'carts';

class CartsFirebaseDao extends FirebaseContainer {
    constructor() {
      super(collection);
    }



    async getCartProds (cartId){
        const cart = await this.getById(cartId);
        return [...cart.products]
    }

    async addProduct(idCart, idProd) {
      await productsFirebaseDao.getById(idProd);
      const docRef = this.query.doc(idCart);
      if (!docRef) {
        const message = `Cart with id ${idCart} does not exist`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }

      return await docRef.update({ products: FieldValue.arrayUnion(idProd) })
      
    }
  
    async deleteProduct(idCart, idProd) {
      await productsFirebaseDao.getById(idProd);
      const docRef = this.query.doc(idCart)  
      if (!docRef) {
        const message = `Cart with id ${cartId} does not exist.`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }
      return await docRef.update({ products: FieldValue.arrayRemove(idProd) })
    }
}


module.exports = CartsFirebaseDao;