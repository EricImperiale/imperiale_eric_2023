import { useState, useEffect, useContext } from "react"
import Product from "../components/Product.jsx"
import { CartContext } from "../contexts/CartContext"

function Products() {
    const [products, setProducts] = useState([])
    const { message } = useContext(CartContext)

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <>
            <section className="container">
                <header>
                    <h2 className="fw-1">Productos</h2>
                </header>

                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}

                <div className="row">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Products