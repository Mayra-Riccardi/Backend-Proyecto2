const Cart = require ('../models/cart');
const cartApi = new Cart();

const createCart = (req, res) => {
    const newCart = {
        id: null,
        products: []
      };
      const idCart = cartApi.createCart(newCart);
      return res.json({ success: true, result: `Cart id ${idCart}` });
} 

const deleteOneCart = (req, res) => {
    const { params: {idCart}} = req;
    if (!idCart) {
        return {error: `No se escribio un id ${id} existente`}
    }

    const error = cartApi.deleteCart(idCart);
    if (error) {
        res.status(404).send(error.message)
    return;
    } 
    res.status(204).send({status: "OK"})
}

const getOneCart = (req, res) => {
    const { idCart } = req.params;
    const cart = cartApi.getByIdCart(idCart)
    if (cart.error) return res.status(404).send(cart.error);
    return res.json(cart);
}

const saveOneProductCart = (req, res) => {
    const {idCart} = req.params;
    const { name, price, image, description } = req.body
    if (!name || !price || !image, !description ) return null;
    
    Cart.idCount++
        const newProduct = {
            id: Cart.idCount,
            name,
            price,
            image,
            description
        }
    
    
    const savedProduct = cartApi.saveProductCart(idCart, newProduct);
    res.status(201).send({status: "OK", data: savedProduct})
}

const deleteOneProductCart = (req, res) => {
    const { idCart, id_Prod } = req.params;

  if (!idCart || !id_Prod) {
    return;
  }

  const deleteOneProduct = cartApi.deleteProduct(idCart, id_Prod);
  res.status(202).send({ status: "Delete", data: deleteOneProduct });
}



module.exports = {
    createCart,
    deleteOneCart,
    getOneCart, 
    saveOneProductCart,
    deleteOneProductCart
}