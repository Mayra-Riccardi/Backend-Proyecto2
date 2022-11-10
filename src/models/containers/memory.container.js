class MemoryContainer {
    constructor(resource){
        this.data = [];
        this.resource = resource
    }

    
    getAll() {
        return [...this.data];
    }

    getById(id) {
        const item = this.data.find(item => item.id === +id)
        return item;
    }

    update(id, item) {
        const indexForUpdate = this.data.findIndex( (item) => item.id === +id)

        if(indexForUpdate === -1){
            return console.log(`Item con id ${id} no encontrado!`)
        }
        
        const updatedItem = {
            ...this.data[indexForUpdate],
            ...item
        }
        
        this.data[indexForUpdate] = updatedItem;

        return updatedItem;
    }

    save(newItem){
        this.data.push(newItem)
    }

    delete(id) {
        const indexForDeleted = this.data.findIndex ((item) => item.id === +id)

        if(indexForDeleted === -1){
            return console.log(`Item con id ${id} no encontrado!`)
        }

        this.data.splice(indexForDeleted, 1);
    }

}

module.exports = MemoryContainer