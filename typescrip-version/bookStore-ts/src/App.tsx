import Header from "./components/Header.tsx"
import Product from "./components/Product.tsx"
import { useCart } from "./hooks/useCart.ts"
import { Product as ProductType } from "./types/index.ts"

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
        isEmpty={isEmpty}
        totalCart={totalCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Books & Guitarrs</h2>

        <div className="row mt-5">
          {data.map((product: ProductType) => (
            <Product
              key={product.id}
              product={product}
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
