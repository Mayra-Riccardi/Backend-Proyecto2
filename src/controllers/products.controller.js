const Products = require ('../models/containers/products/products.container');
/* const productsApi = new Products("product"); */
const  { ProductsDao } = require("../models/daos/app.daos");

const productsDao = new ProductsDao();

class ProductController {
    
    getAllProducts = async (req, res) => {
        const allProducts = await productsDao.getAll();
        res.send({status: "OK", data: allProducts})
    };

    getProductId = async (req, res) => {
        const { idProduct } = req.params;
        const product = await productsDao.getById(idProduct)
        if (product.error) return res.status(404).send(product.error);
        return res.json(product);
      };

    saveNewProduct = async (req,res) => {
        const { title, price, imageUrl, stock, description } = req.body
        if (!title || !price || !imageUrl, !stock, !description ) return null;
        
        productsDao.idCount++
            const newProduct = {
                id: productsDao.idCount,
                title,
                price,
                imageUrl,
                stock,
                description
            }
        
        
        const saveProduct = await productsDao.save(newProduct);
        res.status(201).send({status: "OK", data: saveProduct})
    }

    updateOneProduct = async (req,res) => {
        const { body, params: {idProduct},} = req;
       
        if (!idProduct) {
            return {error: `Producto con ID ${idProduct} no encontrado`}
        }
    
        const updatedProduct = await productsDao.update(idProduct, body)
        res.send({status: "OK", data: updatedProduct})
    }

    deleteOneProduct = async (req, res) => {
        const { params: {idProduct},} = req;
    
        if (!idProduct) {
            return {error: `Producto con ID ${idProduct} no encontrado`}
        }
    
        await productsDao.delete(idProduct);
        res.status(204).send({status: "OK"})
    }

}

module.exports = new ProductController();