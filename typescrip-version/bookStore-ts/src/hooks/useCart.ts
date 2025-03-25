import { useState, useEffect, useMemo } from "react"
import { products } from '../data/products.ts'
import { Product, CartItem } from "../types/index.ts"

// Define the return type interface
interface UseCartReturn {
    data: Product[];
    cart: CartItem[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: Product['id']) => void;
    increaseQuantity: (id: Product['id']) => void;
    decreaseQuantity: (id: Product['id']) => void;
    clearCart: () => void;
    isEmpty: boolean;
    totalCart: string;
}

export const useCart = (): UseCartReturn => {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState<Product[]>(products)
    const [cart, setCart] = useState<CartItem[]>(initialCart)

    const maxItems = 5
    const minItems = 1

    //cada vez que cart cambie, el useEffect se ejecutará, y en este caso grabará en el localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item: Product): void {
        const itemExists = cart.findIndex((product: CartItem) => product.id === item.id)

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= maxItems) return

            const updatedCart = [...cart] //Hago una copia del cart
            updatedCart[itemExists].quantity++ //Sumo una unidad
            setCart(updatedCart) //Actualizo el state
        } else {
            const newItem: CartItem = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id: Product['id']): void {
        console.log('eliminando', id)
        setCart((prevCart: CartItem[]) => prevCart.filter((product: CartItem) => product.id !== id))
    }

    function increaseQuantity(id: Product['id']): void {
        const updatedCart = cart.map((item: CartItem) => {
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

    function decreaseQuantity(id: Product['id']): void {
        const updatedCart = cart.map((item: CartItem) => {
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

    function clearCart(): void {
        setCart([])
    }

    //State Derivado para validar si el carrito está lleno
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    //State Derivado para calcular el total del carrito
    const totalCart = Number(useMemo(() =>
        cart.reduce((total: number, item: CartItem) =>
            total + (item.quantity * item.price), 0
        ), [cart]
    )).toFixed(2)

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
