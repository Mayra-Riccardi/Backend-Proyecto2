const data = require ('../data/data.json');
const { saveData } = require ('../data/utils')


class Products {
    static file = "data.json"
    static idCount = 0;
    constructor() {
      this.products = [];
      data.products.forEach(element => {
         this.products.push(element)
         Products.idCount++
      });
    } 

    getAll() {
        return [...data.products]
    }

    getById(idProduct) {
        const product = data.products.find(product => product.id === +idProduct);
        return product || { error: `Producto con id ${idProduct} no encontrado!` };
    }

    saveProduct (newProduct) {       
        const productAdded = data.products.findIndex((product) => product.title === newProduct.title) > -1

        if (productAdded){
            return;
        }
        
        data.products.push(newProduct)
        saveData(data, Products.file)
        return newProduct;
    }

    updateProduct (idProduct,changes) {
        const indexForUpdate = data.products.findIndex( (product) => product.id === +idProduct)
        /* console.log(indexForUpdate) */
        if(indexForUpdate === -1){
            console.log(`Producto con id ${idProduct} no encontrado!`)
        }
        
        const updatedProduct = {
            ...data.products[indexForUpdate],
            ...changes
        }
        data.products[indexForUpdate] = updatedProduct;
        saveData(data,Products.file)
        return updatedProduct;
    }

    deleteProduct (idProduct) {
        const indexForDeleted = data.products.findIndex ((product) => product.id === +idProduct)
        if(indexForDeleted === -1){
            console.log(`Producto con id ${idProduct} no encontrado!`)
        }
        data.products.splice(indexForDeleted, 1);
        saveData(data,Products.file)
    }

   
}

module.exports = Products
