import Header from "./components/Header"
import Product from "./components/Product"
import { useCart } from "./hooks/useCart.js"

function App() {

  const { data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    totalCart } = useCart()


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}   //Para pasarle el estado de si el carrito está vacio o no al componente Header por props
        totalCart={totalCart} //Para pasarle el estado del total del carrito al componente Header por props 
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Books & Guitarrs</h2>

        <div className="row mt-5">
          {data.map((product) => (
            <Product
              key={product.id}
              product={product}
              cart={cart} //Para pasarle lo que tiene ahora mismo el carrito al componente Product
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
