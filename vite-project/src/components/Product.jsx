import { useState, useEffect, useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import "./Product.css"

function Product({ product }) {
    const { addItemToCart } = useContext(CartContext)

    return (
        <>
            <div className="col-md-4 my-2">
                <div className="card">
                    <img src={`../public/${product.image}`} className="card-img-top" alt={product.imageAlt} />
                    <div className="card-body">
                        <span className="badge text-bg-secondary mb-2">{product.category}</span>
                        <h3 className="card-title fs-5">{product.name}</h3>
                        <p className="card-text text-muted">{product.description}</p>
                        <p className="fs-4">${product.price}</p>
                        <button
                            onClick={() => addItemToCart(product)}
                            className="btn btn-primary w-100 py-2">Agregar Al Carrito</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product