const FileContainer = require('../../containers/file.container');



class ProductsFilesDao extends FileContainer {
  constructor() {
    super("./src/db/data/products.json");
    /* fs.promises.readdir(".").then(data => console.log(data)) */
  }

}

module.exports = ProductsFilesDao;