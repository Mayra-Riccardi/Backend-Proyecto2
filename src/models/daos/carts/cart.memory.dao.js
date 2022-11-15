const MemoryContainer = require('../../containers/memory.container');
const ProductsMemoryDAO = require('../products/products.memory.dao');

/* const productsMemoryDAO = new ProductsMemoryDAO */;

const collection = 'carts';

class CartsMemoryContainer extends MemoryContainer{
    constructor(){
        super(collection);
    }

    async getCartProds (cartId){
        const cart = await this.getById(cartId);
        return [...cart.products]
    }

    async addProduct(idCart,idProd){
        let id = idProd ;
        let cart = this.getById(idCart);                                
        cart.products.push({id})               
        this.update(idCart, cart)
        
        return cart   
    }

    deleteProduct(idCart, idProd){        
        let cart = this.getById(idCart); 
        const index = cart.products.findIndex(item => item.id == idProd);

      if (index < 0) {
        const message = `${this.resource} with id ${productId} does not exist.`;
       console.log(message) 
      }      
        cart.products.splice(index, 1);        
        this.update(idCart,cart)

        return  cart.products
    }
}

module.exports = CartsMemoryContainer;