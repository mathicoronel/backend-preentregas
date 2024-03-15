const fs = require("fs")
const productsFile = "./products.json"

class ProductManager{
    constructor(){
        this.products = []
        this.path = productsFile
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                console.log(`El código ${code} ya existe`)
                return
            }
        }

        const newProduct = {
            id: ProductManager.id++, title, description, price, thumbnail, code, stock
        }

        if(Object.values(newProduct).includes(undefined)){
            console.log("Todos los campos deben estar completos")
            return
        }
        
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        console.log("Producto agregado")
    }

    // Creamos la función readProduct para poder utilizar la lectura de los productos en cualquier parte del código
    async readProduct() {
        let response = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(response)
    }

    async getProduct (){
        let readResponse = await this.readProduct()
        return console.log(readResponse)
    }

    async getProductById(id) {
    try {
        const products = await this.readProduct();
        const product = products.find(p => p.id === id);
        return product || null;
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        return null;
    }
}

    async updateProduct({ id, ...product }) {
        if (!this.products.some(p => p.id === id)) {
            console.log("Producto no encontrado");
        }

        this.products = this.products.map(p => (p.id === id ? { id, ...product } : p));
    
        let oldProducts = await this.readProduct();

        let updatedProducts = oldProducts.map(p => (p.id === id ? { id, ...product } : p));
    
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
    
        console.log("Producto actualizado");
    }
    

    deleteProduct = async (id) => {
        let deleteResponse = await this.readProduct()
        let filter = deleteResponse.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(filter), null, 2)

        console.log("Se ha eliminado el producto")
    }
}

const products = new ProductManager

// TESTING DESAFÍO 1

// Llamamos a getProduct por primera vez y devuelve un []
// console.log(products.getProduct())

// // Agregamos un producto
// products.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

// // Llamamos a getProduct para que muestre el producto anteriormente agregado
// console.log(products.getProduct())

// // Agregamos el mismo producto para demostrar que no se pueden agregar productos iguales
// products.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

// // Llamamos a getProductById para que muestre el producto con el ID que pusimos
// products.getProductById(1)

// // Llamamos otra vez a la función para demostrar que no encuentra el producto con ese ID
// products.getProductById(3)


// TESTING DESAFIO 2

// async function test() {
//     const products = new ProductManager()
    
//     // Agregar un producto
//     await products.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//     await products.addProduct("Producto prueba2", "Este es un producto prueba2", 400, "Sin imagen", "abc456", 25)
    
//     // Obtener los productos
//     console.log(await products.getProduct())

//     // Obtener un producto por su ID
//     console.log(products.getProductById(1))
    
//     // Actualizar un producto
//     await products.updateProduct({ id: 0, title: "Nuevo título", description: "Nueva descripcion", price: 300, thumbnail: "sin imagen", code: "abc123", stock: 25 })
    
//     // Eliminar un producto
//     await products.deleteProduct(0)
// }

// test()

async function test() {
    await products.addProduct("Silla", "Silla de madera", 200, "Sin imagen", "a123", 10)
    await products.addProduct("Mesa", "Mesa de madera", 250, "Sin imagen", "b123", 5)
    await products.addProduct("Platos", "Platos de plástico", 150, "Sin imagen", "c123", 6)
    await products.addProduct("Sillón", "Sillón color gris", 550, "Sin imagen", "d123", 12)
    await products.addProduct("Cama", "Cama de 2 plazas", 450, "Sin imagen", "e123", 8)
    await products.addProduct("Vasos", "6 vasos de vidrio", 80, "Sin imagen", "f123", 10)
    await products.addProduct("Televisor", "Televisor de 40 pulgadas", 250, "Sin imagen", "g123", 5)
    await products.addProduct("Placard", "Placard de madera de 2 puertas", 300, "Sin imagen", "h123", 5)
    await products.addProduct("Cubiertos", "Set de 6 tenedores y 6 cuchillos", 100, "Sin imagen", "i123", 15)
    await products.addProduct("Heladera", "Heladera de 2 puertas color negro", 600, "Sin imagen", "j123", 4)
    await products.addProduct("Lavarropas", "Lavarropas de 10kg", 500, "Sin imagen", "k123", 4)
}

// test()

module.exports = ProductManager