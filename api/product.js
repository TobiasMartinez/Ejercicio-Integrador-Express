const express = require("express");
const router = express.Router();
const user = require('../middleware/usuario');
const auth = require('../middleware/auth');

let products = require("../../4-clase/products");
const authProduct = require("../middleware/authProduct");

router.use(express.json());

//1. Retornar todos los productos del array. “/products”

router.get("/products",user, auth, (req, res) => {
    try{res.status(200).json({
        products,
        message: "Productos en stock"
    })}catch(error){
        res.send('Error 500');
    }
})

// 2. Obtener un producto específico mediante su ID “/product/:id”

router.get("/product/:id", (req, res) => {
    let id = req.params.id;
    let product = products.find(product => product.id == id);

    res.status(200).json({
        product,
        message: "Este es su producto ordenado"
    })
});

// 3. Agregar un nuevo producto “/product”

router.post("/product", authProduct, (req, res) => {
    let productToAdd = req.body;
    let productWithId = { id: products.length +1, ...productToAdd };
    products.push(productWithId);

    res.status(200).json({
        productWithId,
        message: "El producto fue agregado correctamente"
    })
});

// 4. Cambiar alguna propiedad de un producto en particular ( Puede ser name, price, quantity o el que desees ) “/product/:id”

router.put("/products/:id", (req, res) =>{
    let id = req.params.id;
    
    let product = products.find((product) => product.id == id);
    product.quantity = 0;

    res.status(200).json({
        products,
        message: `Del producto ${product.name} no hay mas stock`
    })
});


// 5. Eliminar un producto mediante su ID “/product/:id”  

router.delete("/product/:id", (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => product.id == id);
    products = products.filter(product => product.id != id);

    res.status(200).json({
        products,
        message: `El producto ${product.name} fue eliminado de la base de datos`
    })

})
// Al entrar en el endpoint con ruta “/products”,  traer los productos que deberán llegar con el price en formato  “$ Valor numérico”

router.get("/products-format", (req, res) => {
    const productWithFormat = products.map(product => ({...product, price: formatter.format(product.price)}));

    res.status(200).json({
        productWithFormat,
        message: "Los productos con precio"
    })
});

// Eliminar un producto con su nombre, utilizando try catch

router.delete("products/:name", (req, res) => {
    try {
        let nameOfProduct = req.params.name;
        let product = products.find((product) => product.name == nameOfProduct);
        products = products.filter(product => product.name != nameOfProduct);
    
        res.status(200).json({
            products,
            message: `El producto ${product.name} fue eliminado de la base de datos`
        }) 
    } catch (error) {
        console.log(console.error());
        res.status(404).send(
            "No se ha podido eliminar ese producto, no se encuentra en la base de datos."
        )
    }
})


// FUNCION PARA PASAR NUMERO A FORMATO USD.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

module.exports = router;