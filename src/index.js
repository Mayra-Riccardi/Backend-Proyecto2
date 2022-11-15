//IMPORTACIONES
const express = require ('express');
const appRoutes = require ('./routes/index');
const errorMiddleware = require ('./middlewares/error.middleware')

//DEFINIMOS CONSTANTE PARA EL SERVIDOR EXPRESS
const app = express();

//ENV 

const envConfig = require ('./config');

//PUERTO
const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container'),
  file: require('./models/containers/file.container'),
  memory: require('./models/containers/memory.container')
}

const datasource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]


//MIDDLEWARES - va antes de las rutas!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ROUTES
app.use('/', appRoutes);
app.use(errorMiddleware)



//CONECTAMOS EL SERVIDOR
const connectedServer = app.listen(PORT, () => {
  datasource.connect().then(() => {
    console.log(`🚀 Server's up and runing on port: ${PORT} 🚀`);
    console.log('Connected to ' + envConfig.DATASOURCE);
  })
    
  });
  
