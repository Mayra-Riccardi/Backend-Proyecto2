const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json')
module.exports = {
    memory: {
        products: [],
        carts: [],
      },

    file: {
        products: './data/products.json',
        /* carts: './db/data/carts.json', */
      },

    mongodb: {
        uri: `mongodb+srv://mayricca5:${envConfig.DB_PASSWORD}@youneedsushi.nuk3cgy.mongodb.net/youneedsushi?retryWrites=true&w=majority`
    },

    firebase: {
        credentials: firebaseConfig
    }
}