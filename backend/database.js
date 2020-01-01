const mongoose = require('mongoose');
const URI = 'mongodb://localhost/tareas';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    
}).then(db => console.log('Base de Datos Conectada'))
   .catch(err => console.log(err));