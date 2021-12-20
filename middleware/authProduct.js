const products = require("../../4-clase/products");

const authProduct = (req, res, next) => {
    if ( products.some(product => product.name === req.body.name) ){
        res.send("El producto ya existe")
    } else{
        next()
    };
}

module.exports = authProduct;