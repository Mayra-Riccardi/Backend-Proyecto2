const MemoryContainer = require ("../memory.container")

class Products extends MemoryContainer {
    constructor(resource){
        super(resource)
        this.idCount = 0;
    }


    getAll() {
        return super.getAll()
    }

    getById(id) {
        const product = super.getById(id)
        return product || { error: `Producto con id ${id} no encontrado!` };
    }

    updateProduct (id,product) {
        const updatedProduct = super.update(id, product)
    
        if(!updatedProduct){
            return console.log(`Producto con id ${id} no encontrado!`)
        }
        return updatedProduct;
    }

    saveProduct (newProduct) {
        const products = super.getAll()
        const productAdded = products.findIndex((product) => product.title === newProduct.title) > -1

        if (productAdded){
            return;
        }
        
        super.save(newProduct)
        return newProduct;
    }

    deleteProduct (id) {
        super.delete(id)
    }
}

module.exports = Products;