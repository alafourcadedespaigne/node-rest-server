
require('./config/config');
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));





// Conexión a la base de datos MongoDBs
mongoose.connect(process.env.URLDB, (err, resp) => {

    if(err)throw new err;
    console.log('Base de datos ONLINE'.green);

});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})