const envConfig = require('../config');

module.exports = {
    mongodb: {
        uri: `mongodb+srv://mayricca5:${envConfig.DB_PASSWORD}@youneedsushi.nuk3cgy.mongodb.net/youneedsushi?retryWrites=true&w=majority`
    },

    firebase: {

    }
}