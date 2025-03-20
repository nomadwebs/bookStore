import Header from "./components/Header"
import Product from "./components/Product"
import { useState, useEffect } from "react"
import { products } from './data/products.js'

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(products) //Como es un proyecto pequeño cargamos directamente los datos en el State, si cargara de una api utilizaría el useEffect para cargarlo
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Books & Guitarrs</h2>

        <div className="row mt-5">
          {data.map((product) => (
            <Product
              key={product.id}
              product={product}
              cart={cart} //Para pasarle lo que tiene ahora mismo el carrito 
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Book Store - A Project from <a href='https://fransanchez.dev'>FranSanchez.dev</a></p>
        </div>
      </footer>

    </>
  )
}

export default App
