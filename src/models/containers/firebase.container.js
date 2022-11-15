const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const dbConfig = require('../../db/db.config');

admin.initializeApp({
    credential: admin.credential.cert(dbConfig.firebase.credentials),
  });

class FirebaseContainer {
    constructor(collection){
        const db = getFirestore();
        this.query = db.collection(collection);
    }


    static async connect() {}

    async getAll() {
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(document => {
            /* console.log(document.id) */
            return {
                id: document.id,
                ...document.data()
            }
        })
    }

    async getById(id) {
        const docRef = await this.query.doc(id);
        if (!docRef){
            const message = "El documento no existe"
            console.log(message)
        }
        const document = await docRef.get()
        return document.data()
    }

    async save(item) {
        item.timestamp = Date.now()
        const docRef = this.query.doc();
        return await docRef.set(item)
    }

    async update(id, item) {
        const docRef = this.query.doc(id);
        if (!docRef){
            const message = `Resource with id ${id} does not exist in our records.`;
            console.log(message)
        }
        return await docRef.update(item);
    }

    async delete(id) {
        const docRef = this.query.doc(id);
        return await docRef.delete();
    }
}

module.exports = FirebaseContainer;