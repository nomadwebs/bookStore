export type Product = {
    id: number
    name: string
    image: string
    description: string
    price: number
    link: string
}

export type CartItem = Product & {
    quantity: number
}

/* //Heredamos Product y le añadimos quantity
export type CartItem = Product & {
    quantity: number
    //si aquí añadimos id como el de product lo sobreescribiria
} */


//Este modo permite seleccionar diferentes propiedades
/* export type CartItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
} */