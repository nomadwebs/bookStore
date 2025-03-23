import { useState, useEffect, useMemo } from "react"
import { products } from '../data/products.js'

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //Como es un proyecto pequeño cargamos directamente los datos en el State, si cargara de una api utilizaría el useEffect para cargarlo

    //NOTA: 21/03/2024 - Al principio lo hemos cargado directamente en el state
    //Pero despues usamos el useEffect para cargarlo desde el localStorage, por lo que usar setData en el useState ya no es necesario.

    /* const [data, setData] = useState(products) */
    const [data] = useState(products)


    const [cart, setCart] = useState(initialCart)

    const maxItems = 5
    const minItems = 1

    //cada vez que cart cambie, el useEffect se ejecutará, y en este caso grabará een el localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(newItem) {

        const itemExists = cart.findIndex((prod) => prod.id === newItem.id)

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= maxItems) return

            const updatedCart = [...cart] //Hago una copia del cart
            updatedCart[itemExists].quantity++ //Sumo una unidad
            setCart(updatedCart) //Actualizo el state
        } else {
            console.log('no existe, lo añado')
            newItem.quantity = 1
            setCart([...cart, newItem])
        }

    }

    function removeFromCart(id) {
        console.log('eliminando', id)
        setCart(prevCart => prevCart.filter(product => product.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < maxItems) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > minItems) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart(e) {
        setCart([])
    }

    //State Derivado para validar si el carrito está lleno
    /* const isEmpty = () => cart.length === 0 */
    const isEmpty = useMemo(() => cart.length === 0, [cart]) //A diferencia de la linea función isEmpty anterior, el hook useMemo hace que solo se ejecute cuando cambia la lo que le digamos, en este caso [cart]

    //State Derivado para calcular el total del carrito
    const totalCart = Number(useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])).toFixed(2)

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        totalCart
    }

}
