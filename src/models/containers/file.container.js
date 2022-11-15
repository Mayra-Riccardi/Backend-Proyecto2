const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


class FileContainer {
    constructor(resource) {
      this.resource = resource;
    }
  
    static async connect() {}

    async getAll() {
        const fileToRead = await fs.promises.readFile(`./${this.resource}`, 'utf-8');
        const file = JSON.parse(fileToRead);
        console.log(file)
        return file;
      }

    async getById(id) {
        const file = await this.getAll();
        const fileId = file.find((item) => item.id == id);
        fileId == undefined? (fileId = null) : fileId;
        return fileId
      }

    async save(item) {
      const itemId = {
        id: uuidv4(),
        ...item
      }
      const file = await this.getAll();
      console.log(file)
      file.push(itemId)
      await fs.promises.writeFile(`${this.resource}`, JSON.stringify(file, null, 2))
      
 }

    async update(productId, item) {
        const {title, price, imageUrl, stock, description } = item;
        const list = await this.getAll();
        const index = list.findIndex((item) => item.id == productId)
       

        const files = await this.getAll();

        const updatedItem = {
          id: files[index].id,
          timestamp: Date.now(),
          title,
          price: +price,
          imageUrl,
          stock: +stock,
          description
        }

        files[index] = updatedItem;
        await fs.promises.writeFile(`./${this.resource}`, JSON.stringify(files, null, 2))
      }

    async delete(id) {
        const file = await this.getAll();
        const filteredArray = file.filter((item) => item.id != id);

        await fs.promises.writeFile(`./${this.resource}`, JSON.stringify(filteredArray, null, 2));
        
        if (filteredArray.length === file.length) {
          const message = `Resource with id ${id} does not exist`;
          console.log(message);
        }
        
        return filteredArray
      }
}

module.exports = FileContainer