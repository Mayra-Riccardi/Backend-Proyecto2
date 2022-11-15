const FileContainer = require('../../containers/file.container');
const fs = require ('fs')
/* const products = require ('../../../db/data/products.json') */

class ProductsFilesDao extends FileContainer {
  constructor() {
    super("./src/db/data/products.json");
    /* fs.promises.readdir(".").then(data => console.log(data)) */
  }

}

module.exports = ProductsFilesDao;