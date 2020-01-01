const express = require('express');
const cors = require('cors');
const app = express();

//CORS
app.use(cors());

//Database
require('./database');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/backend/public',express.static('public')); // se usa para ver las imagenes en la url establecida en el task.controller
                                                    // Importante, hay que poner la ruta que va despues del numero del puerto


//Settings
app.set('port', process.env.PORT || 3000);

// Importar y User Rutas
const routes = require('./routes/index.route');
app.use('/api',routes);

async function Init() {
    await app.listen(app.get('port'));
    console.log('Server on Port', app.get('port'))
};

Init();