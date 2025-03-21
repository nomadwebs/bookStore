import { useMemo } from 'react'

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

    //State Derivado para validar si el carrito está lleno

    /* const isEmpty = () => cart.length === 0 */
    const isEmpty = useMemo(() => cart.length === 0, [cart]) //A diferencia de la linea función isEmpty anterior, el hook useMemo hace que solo se ejecute cuando cambia la lo que le digamos, en este caso [cart]

    const totalCart = Number(useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])).toFixed(2)

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            {/* <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" /> */}
                            <h1 style={{ fontSize: '40px', color: 'white' }}>Books & Guitars Store</h1>
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">

                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(product => (
                                                    <tr key={product.id}>
                                                        <td>
                                                            <img className="img-fluid"
                                                                src={`/img/${product.image}.jpg`}
                                                                alt="imagen product" />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td className="fw-bold">
                                                            {product.price}€
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(product.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {product.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(product.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(product.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">To pay: <span className="fw-bold">{totalCart} €</span></p>
                                        <button className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={clearCart}>
                                            Clear cart
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}