const express = require('express');
const app = express();
const product = require('./api/product');
const user = require('./middleware/usuario');

//Middlwares

app.use(express.json());

//Rutas
app.use('/api', product); // Cuando se rotee a slash api, acceder a el archivo product.js en api.


// 

app.listen(8082, () =>{
    console.log('Servidor iniciado en 8082')
})
