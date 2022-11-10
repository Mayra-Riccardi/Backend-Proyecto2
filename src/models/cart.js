const { saveData, readData } = require ('../data/utils')

class Carts {
    static file = "data.carts.json"
    static idCount = 1;
    createCart (newCart) {
        newCart.id = ++Carts.idCount
        const readedData = readData(Carts.file)
        readedData.push(newCart)
        saveData(readedData, Carts.file)
        return newCart.id
    }  
    deleteCart(id) {
        const readedData = readData(Carts.file)
        const filtredData = readedData.filter(cart => cart.id !== +id)
        if (filtredData.length == readedData.length) {
            return {error: `Carrito con ID ${id} no encontrado`}
        }
        saveData(filtredData, Carts.file)
        return;
    }
    getByIdCart(id) {
        const readedData = readData(Carts.file)
        const finded = readedData.find(cart => cart.id === +id);
        /* console.log(finded) */
        return finded || { error: `Carrito con ID ${id} no encontrado!` };
    } 
    saveProductCart (idCart, newProduct) {
        const readedData = readData(Carts.file);
        const cartIndex = readedData.findIndex(cart => cart.id === +idCart);
        const cart= readedData.find(product => product.id === +idCart);

        if (cartIndex < 0) return `Número de Carrito: '${idCart}' NO existe!`;

        const nameProduct = cart.products.find((product) => product.name === newProduct.name);

         //Validamos que el nombre ingresado no este asignado a otro producto.
         if (nameProduct) {
         return `Producto con el nombre: '${newProduct.name}' existente!`;
         }

        const newProductId = {
            id: cart.products.length + 1,
            ...newProduct,
          };
        
          cart.products.push(newProductId);
          readedData[cartIndex] = cart;
          saveData(cart, Carts.file);
          return newProductId;
        
        /* else if (productIndex < 0)
        return { error: `Producto id: ${idProduct} no encontrado`};
        /* readedData[cartIndex].products.push(readedData[productIndex]) */     
    }

    deleteProduct (idCart, id_Prod) {
        const readedData = readData(Carts.file);
        
        const cartIndex = readedData.findIndex(cart => cart.id === +idCart);
         const productIndex = readedData[cartIndex].products.findIndex(product => product.id === +id_Prod);
         if (cartIndex < 0) return `Número de Carrito: '${idCart}' NO existe!`;
         if (productIndex < 0) return `Número de Producto: '${id_Prod}' NO existe! `;
           
         const newListProduct = readedData[cartIndex].products.filter((product) => product.id !== cartIndex + 1);
         console.log(newListProduct)
           
         readedData[cartIndex].products = newListProduct;
         readedData[cartIndex].products.map((el) => (el.id = 1));
         saveData(readedData, Carts.file);
         return newListProduct;
     }
    
}

module.exports = Carts