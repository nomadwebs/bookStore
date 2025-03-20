export default function Product({ product, addToCart }) {

    const { id, name, image, description, price } = product

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>

            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price} €</p>
                {product.link !== null ? <a href={`${product.link}`} className="viewMoreLink">Vew More</a> : <></>}
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(product)} //Le tenemos que pasar con arrow function para que no se llame en automatico

                >Agregar al Carrito</button>
            </div>
        </div >
    )
}