import Header from "./components/Header"
import Product from "./components/Product"
import { useState, useEffect } from "react"
import { products } from './data/products.js'

function App() {
  const [data, setData] = useState(products) //Como es un proyecto pequeño cargamos directamente los datos en el State, si cargara de una api utilizaría el useEffect para cargarlo

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our Books</h2>

        <div className="row mt-5">
          {data.map((product) => (
            <Product
              key={product.id}
              product={product}
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
