class ProductManager{
    constructor(){
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                console.log(`El código ${code} ya existe`)
                break
            }
        }

        const newProduct = {
            title, description, price, thumbnail, code, stock
        }

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({...newProduct, id: ProductManager.id})
        } else{
            console.log("Todos los campos deben estar completos")
        }

    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        if(!this.products.find((p) => p.id === id)){
            console.log("Not found")
        } else{
            this.products.find((p) => p.id === id)
        }
    }
}

const products = new ProductManager

// TESTING

// Llamamos a getProduct por primera vez y devuelve un []
console.log(products.getProduct())

// Agregamos un producto
products.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

// Llamamos a getProduct para que muestre el producto anteriormente agregado
console.log(products.getProduct())

// Agregamos el mismo producto para demostrar que no se pueden agregar productos iguales
products.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

// Llamamos a getProductById para que muestre el producto con el ID que pusimos
products.getProductById(1)

// Llamamos otra vez a la función para demostrar que no encuentra el producto con ese ID
products.getProductById(3)