const PORT = 8080
const express = require("express")
const app = express()

const productManager = require("../main")

const products = new productManager()

app.get("/products", async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : null
    let allProducts = await products.readProduct()

    if(limit){
        res.send(allProducts.slice(0, limit))
    } else {
        res.send(allProducts)
    }
})

app.get("/products/:pid", async (req, res) => {
    let productId = parseInt(req.params.pid)
    let product = await products.getProductById(productId)
    
    if(product){
        res.send(product)
    } else {
        res.send("El producto no ha sido encontrado")
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})