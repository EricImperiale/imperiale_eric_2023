import { useContext, useState, useEffect } from "react"
import { CartContext } from "../contexts/CartContext"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

function Cart() {
    const { cartItems, editItemToCart, message, generateOrder } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    const total = cartItems?.reduce((previous, current) => previous + current.price * current.amount, 0)

    return (
        <>
            <section>
                <header>
                    <h2>Tu Carrito</h2>
                </header>

                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}

                <div className="row">
                    {cartItems.length ? (
                        cartItems.map((product, index) => (
                            <div className="col-md-4 my-3" key={index}>
                                <div className="card">
                                    <img src={`../public/${product.image}`} className="card-img-top" alt={product.imageAlt} />
                                    <div className="card-body">
                                        <h3 className="card-title fs-5">{product.name}</h3>
                                        <p className="card-text text-muted">{product.description}</p>
                                        <p className="card-text text-muted">Cant: {product.amount}</p>
                                        <p className="fs-4">{`Subtotal: $${product.price * product.amount}`}</p>
                                        <div>
                                            <button className="btn btn-outline-warning btn-add" onClick={() => editItemToCart(product._id, "add", product.amount)}>
                                                Agregar
                                            </button>
                                            <button className="btn btn-outline-danger mx-1 btn-edit" onClick={() => editItemToCart(product._id, "del", product.amount)}>
                                                Restar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="fs-5 d-block text-muted my-2">Tu carrito está vació.</span>
                    )}
                </div>

                {cartItems && (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body text-end">
                                    <p className="card-text fs-4">{`Total: $${total}`}</p>
                                </div>
                                {user ? (
                                    <div className="card-body text-end">
                                        <Link to=""
                                            className="btn btn-primary"
                                            onClick={() => generateOrder(cartItems, total, user)}
                                        >Checkout</Link>
                                    </div>
                                ) : (
                                    <div className="card-footer text-end">
                                        <span className="d-block my-2">
                                            Para realizar el checkout tenés que iniciar sesión.
                                        </span>
                                        <Link to="/iniciar-sesion" className="btn btn-outline-success">
                                            Iniciar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default Cart